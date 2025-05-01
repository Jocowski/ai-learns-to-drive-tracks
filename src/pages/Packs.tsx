import React from 'react';
import { Typography } from 'antd';
import './Packs.css';

const { Title } = Typography;

const Packs: React.FC = () => {
  return (
    <div className="packs-container">
      <Title level={2}>Track Packs</Title>
      <div className="dev-warning">
        <Typography.Text strong>⚠️ This feature is currently in development</Typography.Text>
      </div>
      <div className="description">
        <Typography.Text>
          Tracks into packs, making it easier to find and download collections of tracks that match your interests. Some examples are:
        </Typography.Text>
      </div>
      <ul className="pack-examples">
        <li>Complete Collection - All available tracks in one pack</li>
        <li>Ice Tracks - A collection of ice tracks</li>
        <li>Dirt Tracks - A collection of dirt tracks</li>
        <li>GP Tracks - A collection of professional racing tracks</li>
      </ul>
    </div>
  );
};

export default Packs; 