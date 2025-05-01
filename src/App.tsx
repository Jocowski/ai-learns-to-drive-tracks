import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { CarOutlined, AppstoreOutlined, BookOutlined } from '@ant-design/icons';
import Tracks from './pages/Tracks';
import Packs from './pages/Packs';
import Tutorial from './pages/Tutorial';
import './App.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Link to="https://store.steampowered.com/app/3312030/AI_Learns_To_Drive/" target="_blank">
            <div className="logo" />
          </Link>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<CarOutlined />}>
              <Link to="/tracks">Tracks</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
              <Link to="/packs">Packs</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<BookOutlined />}>
              <Link to="/tutorial">Tutorial</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/tracks" element={<Tracks />} />
              <Route path="/packs" element={<Packs />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/" element={<Tracks />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
