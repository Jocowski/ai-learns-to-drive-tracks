import React from 'react';
import { Typography } from 'antd';
import { Divider } from 'antd';
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
      <Divider />
      <div className="tutorial-section">
        <Title level={3}>How to download tracks</Title>
        <div style={{ marginBottom: 12 }}>
          <Typography.Text>
            Want to add new tracks to your game? Follow these steps:
          </Typography.Text>
        </div>
        <ol className="tutorial-list">
          <li>
            <b>Download a track file</b><br/>
            Get a <code>.track</code> file from <a href="https://jocowski.github.io/ai-learns-to-drive-tracks/" target="_blank" rel="noopener noreferrer">my website</a> or from the <a href="https://discord.gg/6EuZgx2cg6" target="_blank" rel="noopener noreferrer">official Discord (track-share channel)</a>.
          </li>
          <li>
            <b>Open the game tracks folder</b><br/>
            Go to:
            <div style={{ margin: '0 0 0 6px', background: '#23272f', color: '#fff', padding: '8px 12px', borderRadius: '6px', display: 'inline-block', fontFamily: 'monospace', fontSize: '1.05em' }}>
              %appdata%\AI Learns To Drive\tracks
            </div>
          </li>
          <li>
            <b>Copy the track file</b><br/>
            Paste the <code>.track</code> file you downloaded into this folder.
          </li>
          <li>
            <b>Start the game</b><br/>
            Go to the <b>Custom</b> tab. Your new track should appear there.
          </li>
        </ol>
        <Typography.Text type="secondary"><i>The track name is the same as the name of the <code>.track</code> file.</i></Typography.Text>
      </div>
      <Divider />
      <div className="tutorial-section">
        <Title level={3}>How to download multiple tracks</Title>
        <div style={{ marginBottom: 12 }}>
          <Typography.Text>
            Want to download several tracks at once? Here's how to use the bulk download feature:
          </Typography.Text>
        </div>
        <ol className="tutorial-list">
          <li>
            <b>Select multiple tracks</b><br/>
            On the <a href="https://jocowski.github.io/ai-learns-to-drive-tracks/" target="_blank" rel="noopener noreferrer">tracks page</a>, use the checkboxes to select the tracks you want to download.
          </li>
          <li>
            <b>Download the zip file</b><br/>
            Click the <b>"Download All"</b> button in the overlay that appears at the bottom of the page. This will download a <code>.zip</code> file containing all selected tracks.
          </li>
          <li>
            <b>Extract the zip file</b><br/>
            Right-click the downloaded <code>.zip</code> file and select <b>"Extract All"</b> or use your preferred zip extraction tool (like 7-Zip, WinRAR, or the built-in Windows extractor).
          </li>
          <li>
            <b>Open the game tracks folder</b><br/>
            Go to:
            <div style={{ margin: '0 0 0 6px', background: '#23272f', color: '#fff', padding: '8px 12px', borderRadius: '6px', display: 'inline-block', fontFamily: 'monospace', fontSize: '1.05em' }}>
              %appdata%\AI Learns To Drive\tracks
            </div>
          </li>
          <li>
            <b>Copy the track files</b><br/>
            Copy all the extracted <code>.track</code> files from the zip folder and paste them into the game tracks folder.
          </li>
          <li>
            <b>Start the game</b><br/>
            Go to the <b>Custom</b> tab. All your new tracks should appear there.
          </li>
        </ol>
        <Typography.Text type="secondary">
          <i>💡 <b>Tip:</b> You can select all tracks at once using the "Select All" checkbox above the track grid.</i>
        </Typography.Text>
      </div>
      <Divider />
      <div className="tutorial-section">
        <Title level={3}>How to upload your track</Title>
        <div style={{ marginBottom: 12 }}>
          <Typography.Text>
            Want to share your own track with others? Here's how:
          </Typography.Text>
        </div>
        <ol className="tutorial-list">
          <li>
            <b>Open the game tracks folder</b><br/>
            Go to:
            <div style={{ margin: '0 0 0 6px', background: '#23272f', color: '#fff', padding: '8px 12px', borderRadius: '6px', display: 'inline-block', fontFamily: 'monospace', fontSize: '1.05em' }}>
              %appdata%\AI Learns To Drive\tracks
            </div>
          </li>
          <li>
            <b>Find your track file</b><br/>
            Select the <code>.track</code> file you want to share.
          </li>
          <li>
            <b>Go to the Discord server</b><br/>
            Open the <a href="https://discord.gg/6EuZgx2cg6" target="_blank" rel="noopener noreferrer">official Discord</a> and go to the <b>track-share</b> channel.
          </li>
          <li>
            <b>Upload your track</b><br/>
            Post your <code>.track</code> file in the channel, along with an image of your track.
          </li>
        </ol>
        <Typography.Text type="secondary"><i>The track name is the same as the name of the <code>.track</code> file.</i></Typography.Text>
      </div>
    </div>
  );
};

export default Tutorial; 