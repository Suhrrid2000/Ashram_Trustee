import React, { useState, useEffect, useRef } from 'react';
import './ManageEvents.css';

const ManageEvents = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    imageFiles: [], // multiple images
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Carousel state
  const carouselIndex = useRef({}); // store index per event

  // Fetch events
  const fetchEvents = async () => {
    try {
      //const res = await fetch('http://localhost:8000/api/events');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
      const data = await res.json();
      setEvents(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'view') {
      fetchEvents();
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage('');
    setMessageType('');
    setEditId(null);
    setFormData({
      name: '',
      date: '',
      location: '',
      description: '',
      imageFiles: [],
    });
    setCurrentPage(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      imageFiles: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');
    /*
    const url = editId
      ? `http://localhost:8000/api/events/${editId}`
      : 'http://localhost:8000/api/events';
    */
    const url = editId
    ? `${import.meta.env.VITE_API_URL}/api/events/${editId}`
    : `${import.meta.env.VITE_API_URL}/api/events`;
    
    const method = editId ? 'PUT' : 'POST';

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('date', formData.date);
      fd.append('location', formData.location);
      fd.append('description', formData.description);
      formData.imageFiles.forEach((file) => {
        fd.append('images', file); // multiple file field name
      });

      const res = await fetch(url, {
        method,
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(editId ? 'Event updated successfully!' : 'Event added successfully!');
        setMessageType('success');
        setFormData({
          name: '',
          date: '',
          location: '',
          description: '',
          imageFiles: [],
        });
        setEditId(null);
        fetchEvents();
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 4000);
      } else {
        setMessage(data.message || 'Something went wrong');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error or server issue');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      date: event.date?.split('T')[0],
      location: event.location,
      description: event.description,
      imageFiles: [],
    });
    setEditId(event._id);
    setActiveTab('add');
  };

  const confirmDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      //const res = await fetch(`http://localhost:8000/api/events/${eventToDelete}`, {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${eventToDelete}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('Event deleted successfully');
        setMessageType('success');
        fetchEvents();
      } else {
        const data = await res.json();
        setMessage(data.message || 'Failed to delete event');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Server or network error');
      setMessageType('error');
    } finally {
      setShowConfirmModal(false);
      setEventToDelete(null);
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    }
  };

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event.images && event.images.length > 1) {
            const idx = carouselIndex.current[event._id] || 0;
            carouselIndex.current[event._id] = (idx + 1) % event.images.length;
          }
          return event;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="manage-container">
      <div className="tabs">
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => handleTabChange('add')}
        >
          {editId ? 'Edit Event' : 'Add Event'}
        </button>
        <button
          className={activeTab === 'view' ? 'active' : ''}
          onClick={() => handleTabChange('view')}
        >
          View Events
        </button>
      </div>

      {activeTab === 'add' && (
        <div className="form-container">
          <h2>{editId ? 'Edit Event' : 'Add New Event'}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Event Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>

            <label>
              Event Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>

            <label>
              Event Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>

            <label>
              Event Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>

            <label>
              Event Images (Max 10):
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                required={!editId}
                disabled={loading}
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : editId ? 'Update Event' : 'Submit'}
            </button>
          </form>

          {message && (
            <p
              className={messageType === 'success' ? 'success-message' : 'error-message'}
            >
              {message}
            </p>
          )}
        </div>
      )}

      {activeTab === 'view' && (
        <div className="view-container">
          <h2>All Events</h2>
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <>
              <div className="event-list">
                {currentEvents.map((event) => (
                  <div key={event._id} className="event-card">
                    {event.images && event.images.length > 0 ? (
                      <img
                        src={event.images[carouselIndex.current[event._id] || 0]}
                        alt={event.name}
                      />
                    ) : (
                      <img src={event.imageUrl} alt={event.name} />
                    )}
                    <div className="event-details">
                      <h3>{event.name}</h3>
                      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                      <p><strong>Location:</strong> {event.location}</p>
                      <p>{event.description}</p>
                      <small>
                        <strong>Update Tms: </strong> {new Date(event.updatedAt).toLocaleDateString()}{" "}
                        {new Date(event.updatedAt).toLocaleTimeString()}
                      </small>
                      <div className="event-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => confirmDelete(event._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((pageNumber) => {
                      if (totalPages <= 5) return true;
                      if (currentPage <= 3) return pageNumber <= 5;
                      if (currentPage >= totalPages - 2)
                        return pageNumber > totalPages - 5;
                      return (
                        pageNumber >= currentPage - 2 &&
                        pageNumber <= currentPage + 2
                      );
                    })
                    .map((pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  <button
                    className="page-btn"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this event?</p>
            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-btn"
                onClick={handleDeleteConfirmed}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;



