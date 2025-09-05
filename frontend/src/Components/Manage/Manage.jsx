import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Manage.css';

const Manage = () => {
  const navigate = useNavigate();

  return (
    <div className="manage-dashboard">
      <h1>Manage Site</h1>
      <div className="manage-options">
        <div className="manage-card" onClick={() => navigate('/manage/events')}>
          <h2>Manage Events</h2>
          <p>Add, edit, and delete upcoming events.</p>
        </div>
        <div className="manage-card" onClick={() => navigate('/manage/announcements')}>
          <h2>Manage Announcements</h2>
          <p>Post important updates and announcements.</p>
        </div>
        <div className="manage-card" onClick={() => navigate('/manage/news')}>
          <h2>Manage News</h2>
          <p>Update news articles and highlights.</p>
        </div>
      </div>
    </div>
  );
};

export default Manage;
