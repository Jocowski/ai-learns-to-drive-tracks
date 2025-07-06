import React, { useState } from 'react';
import { Card, Space, Typography, Tag, Checkbox } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import ImagePreviewModal from './ImagePreviewModal';
import './TrackCard.css';

const { Text } = Typography;

interface Track {
  id: string;
  name: string;
  description: string;
  surface: string[];
  tags: string[];
  length: number;
  authors: string[];
}

interface TrackCardProps {
  track: Track;
  onClick: (track: Track) => void;
  isSelected: boolean;
  onSelectionChange: (trackId: string, selected: boolean) => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, onClick, isSelected, onSelectionChange }) => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const imageUrl = require(`../assets/tracks/${track.id}.png`);

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPreviewVisible(true);
  };

  const handleCheckboxChange = (e: any) => {
    e.stopPropagation();
    onSelectionChange(track.id, e.target.checked);
  };

  return (
    <>
      <Card
        hoverable
        className="track-card-container"
        onClick={() => onClick(track)}
        cover={
          <div className="track-card-image-container">
            <img
              alt={track.name}
              src={imageUrl}
              className="track-card-image"
            />
            <button 
              className="preview-button"
              onClick={handlePreviewClick}
            >
              <EyeOutlined />
            </button>
            <div className="checkbox-overlay">
              <Checkbox
                checked={isSelected}
                onChange={handleCheckboxChange}
                onClick={handleCheckboxChange}
              />
            </div>
          </div>
        }
        actions={[
          <a 
            key="download"
            href={require(`../data/tracks/${track.id}.track`)}
            download={`${track.name}.track`}
            className="track-card-download-link"
            onClick={(e) => e.stopPropagation()}
          >
            <Space>
              <DownloadOutlined />
              Download Track
            </Space>
          </a>
        ]}
      >
        <div className="track-card-info">
          <div className="track-card-title">{track.name}</div>
          <div className="track-card-info-row">
            <Text className="track-card-info-label">Surface:</Text>
            <Space size={[0, 8]} wrap>
              {track.surface.map((surfaceType, index) => (
                <Tag key={index} color="blue">
                  {surfaceType}
                </Tag>
              ))}
            </Space>
          </div>
          <div className="track-card-info-row">
            <Text className="track-card-info-label">Length:</Text>
            <Text>{track.length} units</Text>
          </div>
          <div className="track-card-info-row">
            <Text className="track-card-info-label">Author:</Text>
            <Text className="track-card-author-text">{track.authors.join(', ')}</Text>
          </div>
        </div>
      </Card>
      <ImagePreviewModal
        imageUrl={imageUrl}
        isVisible={isPreviewVisible}
        onClose={() => setIsPreviewVisible(false)}
      />
    </>
  );
};

export default TrackCard; 