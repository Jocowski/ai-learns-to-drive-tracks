import React from 'react';
import { Modal } from 'antd';
import './ImagePreviewModal.css';

interface ImagePreviewModalProps {
  imageUrl: string;
  isVisible: boolean;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, isVisible, onClose }) => {
  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width="auto"
      className="image-preview-modal"
      centered
    >
      <img
        src={imageUrl}
        alt="Track Preview"
        className="preview-image"
      />
    </Modal>
  );
};

export default ImagePreviewModal; 