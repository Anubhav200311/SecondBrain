import React from 'react';
import Button from './button';

const SidePanelButtons = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' , alignItems: 'flex-start'}}>
      <Button image="/path/to/tweet-icon.png" text="Tweets" />
      <Button image="/path/to/videos-icon.png" text="Videos" />
      <Button image="/path/to/documents-icon.png" text="Documents" />
      <Button image="/path/to/links-icon.png" text="Links" />
      <Button image="/path/to/tags-icon.png" text="Tags" />
    </div>
  );
};

export default SidePanelButtons;