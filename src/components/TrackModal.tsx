import React from 'react';
import { Modal, Space, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './TrackModal.css';

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

interface TrackModalProps {
  track: Track | null;
  isVisible: boolean;
  onClose: () => void;
}

const TrackModal: React.FC<TrackModalProps> = ({ track, isVisible, onClose }) => {
  if (!track) return null;

  return (
    <Modal
      title={track.name}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="modal-content">
        <div className="modal-image-container">
          <img
            alt={track.name}
            src={require(`../assets/tracks/${track.id}.png`)}
            className="modal-track-image"
          />
        </div>
        <div className="modal-info">
          <div className="modal-description">
            <Text strong>Description:</Text>
            <Text>{track.description}</Text>
          </div>
          <div className="modal-details">
            <div className="modal-detail-row">
              <Text strong>Surface:</Text>
              <Text>{track.surface.join(', ')}</Text>
            </div>
            <div className="modal-detail-row">
              <Text strong>Length:</Text>
              <Text>{track.length} units</Text>
            </div>
            <div className="modal-detail-row">
              <Text strong>Author:</Text>
              <Text>{track.authors.join(', ')}</Text>
            </div>
            <div className="modal-detail-row tags-row">
              <Text strong>Tags:</Text>
              <Space wrap>
                {track.tags.map((tag, index) => (
                  <Text key={index} className="modal-track-tag">
                    {tag}
                  </Text>
                ))}
              </Space>
            </div>
          </div>
          <div className="modal-actions">
            <a 
              href={require(`../data/tracks/${track.id}.track`)}
              download={`${track.name}.track`}
              className="modal-download-link"
            >
              <Space>
                <DownloadOutlined />
                Download Track
              </Space>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TrackModal; 