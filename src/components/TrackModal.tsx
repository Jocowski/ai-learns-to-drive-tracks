import React, { useState } from 'react';
import { Modal, Space, Typography } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import ImagePreviewModal from './ImagePreviewModal';
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
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  if (!track) return null;

  const imageUrl = require(`../assets/tracks/${track.id}.png`);

  return (
    <>
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
              src={imageUrl}
              className="modal-track-image"
            />
            <button 
              className="preview-button"
              onClick={() => setIsPreviewVisible(true)}
            >
              <EyeOutlined />
            </button>
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
      <ImagePreviewModal
        imageUrl={imageUrl}
        isVisible={isPreviewVisible}
        onClose={() => setIsPreviewVisible(false)}
      />
    </>
  );
};

export default TrackModal; 