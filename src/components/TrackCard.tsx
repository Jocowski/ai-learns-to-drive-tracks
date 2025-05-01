import React from 'react';
import { Card, Space, Typography, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
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
}

const TrackCard: React.FC<TrackCardProps> = ({ track, onClick }) => {
  return (
    <Card
      hoverable
      className="track-card-container"
      onClick={() => onClick(track)}
      cover={
        <div className="track-card-image-container">
          <img
            alt={track.name}
            src={require(`../assets/tracks/${track.id}.png`)}
            className="track-card-image"
          />
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
          <Text>{track.authors.join(', ')}</Text>
        </div>
      </div>
    </Card>
  );
};

export default TrackCard; 