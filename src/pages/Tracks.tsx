import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Typography, Row, Col, Space, Divider, Input, Button, Select, Slider, Dropdown, Checkbox, message } from 'antd';
import { FilterOutlined, DownloadOutlined, CloseOutlined } from '@ant-design/icons';
import JSZip from 'jszip';
import tracksData from '../data/tracks.json';
import TrackCard from '../components/TrackCard';
import TrackModal from '../components/TrackModal';
import './Tracks.css';

const { Title, Text } = Typography;

interface Track {
  id: string;
  name: string;
  description: string;
  surface: string[];
  tags: string[];
  length: number;
  authors: string[];
}

// Custom hook for debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Tracks: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersMenuVisible, setIsFiltersMenuVisible] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    surface: [] as string[],
    lengthRange: [0, 100] as [number, number],
    tags: [] as string[],
  });

  // Debounce search query to improve performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    // Load tracks data
    setTracks(tracksData);
  }, []);

  const handleCardClick = useCallback((track: Track) => {
    setSelectedTrack(track);
    setIsModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
    setSelectedTrack(null);
  }, []);

  const handleFiltersChange = useCallback((key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      surface: [],
      lengthRange: [0, 100],
      tags: [],
    });
  }, []);

  const handleTrackSelection = useCallback((trackId: string, selected: boolean) => {
    setSelectedTracks(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(trackId);
      } else {
        newSet.delete(trackId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback((checked: boolean, currentFilteredTracks: Track[]) => {
    if (checked) {
      setSelectedTracks(new Set(currentFilteredTracks.map(track => track.id)));
    } else {
      setSelectedTracks(new Set());
    }
  }, []);

  const handleDownloadSelected = async () => {
    if (selectedTracks.size === 0) {
      message.warning('No tracks selected for download');
      return;
    }

    try {
      message.loading({ content: 'Creating zip file...', key: 'download' });
      
      const zip = new JSZip();
      const selectedTrackList = Array.from(selectedTracks);
      
      // Add each selected track to the zip
      for (const trackId of selectedTrackList) {
        const track = tracks.find(t => t.id === trackId);
        if (track) {
          try {
            // Fetch the track file
            const response = await fetch(require(`../data/tracks/${trackId}.track`));
            const trackData = await response.arrayBuffer();
            
            // Add to zip with a clean filename
            const fileName = `${track.name.replace(/[^a-zA-Z0-9\s-]/g, '')}.track`;
            zip.file(fileName, trackData);
          } catch (error) {
            console.error(`Failed to add track ${track.name} to zip:`, error);
            message.error(`Failed to add ${track.name} to zip file`);
          }
        }
      }
      
      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create download link
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `selected-tracks-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
      
      message.success({ 
        content: `Successfully downloaded ${selectedTracks.size} track${selectedTracks.size !== 1 ? 's' : ''}`, 
        key: 'download' 
      });
      
    } catch (error) {
      console.error('Failed to create zip file:', error);
      message.error({ 
        content: 'Failed to create zip file. Please try again.', 
        key: 'download' 
      });
    }
  };

  const handleClearSelection = useCallback(() => {
    setSelectedTracks(new Set());
  }, []);

  // Memoize expensive calculations
  const filteredTracks = useMemo(() => {
    if (!tracks.length) return [];
    
    const searchLower = debouncedSearchQuery.toLowerCase();
    
    return tracks.filter(track => {
      // Early return for search if no search query
      if (searchLower && !track.name.toLowerCase().includes(searchLower) && 
          !track.authors.some(author => author.toLowerCase().includes(searchLower))) {
        return false;
      }

      // Early return for surface filter
      if (filters.surface.length > 0 && 
          !filters.surface.every(surface => track.surface.includes(surface))) {
        return false;
      }

      // Early return for length filter
      if (track.length < filters.lengthRange[0] || track.length > filters.lengthRange[1]) {
        return false;
      }

      // Early return for tags filter
      if (filters.tags.length > 0 && 
          !filters.tags.every(tag => track.tags.includes(tag))) {
        return false;
      }

      return true;
    });
  }, [tracks, debouncedSearchQuery, filters]);

  // Memoize unique values for filters
  const uniqueSurfaces = useMemo(() => 
    Array.from(new Set(tracks.flatMap(track => track.surface))), 
    [tracks]
  );
  
  const uniqueTags = useMemo(() => 
    Array.from(new Set(tracks.flatMap(track => track.tags))), 
    [tracks]
  );
  
  // Memoize min and max length calculations
  const { minLength, maxLength } = useMemo(() => {
    if (!tracks.length) return { minLength: 0, maxLength: 100 };
    const lengths = tracks.map(track => track.length);
    return {
      minLength: Math.min(...lengths),
      maxLength: Math.max(...lengths)
    };
  }, [tracks]);

  const filterMenu = useMemo(() => (
    <div className="filter-menu-content" style={{ width: 300, padding: '16px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text strong>Surface</Text>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select surfaces"
            value={filters.surface}
            onChange={(value) => handleFiltersChange('surface', value)}
            options={uniqueSurfaces.map(surface => ({ label: surface, value: surface }))}
          />
        </div>

        <div>
          <Text strong>Length Range (units)</Text>
          <Slider
            range
            min={minLength}
            max={maxLength}
            value={filters.lengthRange}
            onChange={(value) => handleFiltersChange('lengthRange', value)}
            tooltip={{ formatter: (value) => `${value} units` }}
          />
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Text type="secondary">{filters.lengthRange[0]} units</Text>
            <Text type="secondary">{filters.lengthRange[1]} units</Text>
          </Space>
        </div>

        <div>
          <Text strong>Tags</Text>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select tags"
            value={filters.tags}
            onChange={(value) => handleFiltersChange('tags', value)}
            options={uniqueTags.map(tag => ({ label: tag, value: tag }))}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button onClick={handleResetFilters}>Reset</Button>
        </div>
      </Space>
    </div>
  ), [filters, uniqueSurfaces, uniqueTags, minLength, maxLength, handleFiltersChange, handleResetFilters]);

  return (
    <div className="tracks-container">
      <div className="tracks-content">
        <div className="tracks-header">
          <Title level={2}>
            <Space>
              Track Selection
            </Space>
          </Title>
          <Text type="secondary" className="tracks-subtitle">
            Choose from {filteredTracks.length} available tracks to test your AI
          </Text>
        </div>
        
        <Divider />

        <div className="filters-container">
          <Space>
            <Input.Search
              placeholder="Search by track name or author"
              allowClear
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', minWidth: 300 }}
            />
            <Dropdown
              overlay={filterMenu}
              trigger={['click']}
              open={isFiltersMenuVisible}
              onOpenChange={setIsFiltersMenuVisible}
            >
              <Button 
                icon={<FilterOutlined />}
              >
                More Filters
              </Button>
            </Dropdown>
          </Space>
        </div>

        {filteredTracks.length > 0 && (
          <div className="select-all-container" style={{ marginBottom: 16 }}>
            <Checkbox
              checked={selectedTracks.size === filteredTracks.length && filteredTracks.length > 0}
              indeterminate={selectedTracks.size > 0 && selectedTracks.size < filteredTracks.length}
              onChange={(e) => handleSelectAll(e.target.checked, filteredTracks)}
            >
              <Text strong>Select All ({selectedTracks.size} selected)</Text>
            </Checkbox>
          </div>
        )}

        <Row gutter={[24, 24]}>
          {filteredTracks.map((track) => (
            <Col xs={24} sm={20} md={12} lg={8} key={track.id}>
              <TrackCard 
                track={track} 
                onClick={handleCardClick}
                isSelected={selectedTracks.has(track.id)}
                onSelectionChange={handleTrackSelection}
              />
            </Col>
          ))}
        </Row>

        <TrackModal
          track={selectedTrack}
          isVisible={isModalVisible}
          onClose={handleModalClose}
        />
      </div>

      {/* Download Overlay */}
      {selectedTracks.size > 0 && (
        <div className="download-overlay">
          <div className="download-overlay-content">
            <div className="download-overlay-info">
              <Text strong style={{ color: 'white' }}>
                {selectedTracks.size} track{selectedTracks.size !== 1 ? 's' : ''} selected
              </Text>
              <Text type="secondary" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {Array.from(selectedTracks).map(trackId => {
                  const track = tracks.find(t => t.id === trackId);
                  return track?.name;
                }).join(', ')}
              </Text>
            </div>
            <Space>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />}
                onClick={handleDownloadSelected}
                size="large"
              >
                Download All
              </Button>
              <Button 
                icon={<CloseOutlined />}
                onClick={handleClearSelection}
                size="large"
              >
                Clear
              </Button>
            </Space>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracks; 