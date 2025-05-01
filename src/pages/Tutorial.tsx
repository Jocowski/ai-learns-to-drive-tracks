import React from 'react';
import { Typography } from 'antd';
import './Tutorial.css';

const { Title } = Typography;

const Tutorial: React.FC = () => {
  return (
    <div className="tutorial-container">
      <Title level={2}>Tutorial</Title>
      <div className="dev-warning">
        <Typography.Text strong>⚠️ This feature is currently in development</Typography.Text>
      </div>
      <div className="description">
        <Typography.Text>
          Tutorials to help from basic track creation to importing and sharing tracks.
        </Typography.Text>
      </div>
      <ul className="feature-list">
        <li>How to create and customize your own tracks</li>
        <li>Step-by-step guide for importing tracks</li>
        <li>Sharing and exporting your creations</li>
      </ul>
    </div>
  );
};

export default Tutorial; 