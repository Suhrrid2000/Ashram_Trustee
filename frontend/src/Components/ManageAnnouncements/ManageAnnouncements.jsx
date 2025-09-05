import React, { useState, useEffect } from "react";
import "./ManageAnnouncements.css";

const ManageAnnouncements = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 5;

  // UX states
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  // Delete modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  useEffect(() => {
    if (activeTab === "view") {
      fetchAnnouncements();
    }
  }, [activeTab]);

  const fetchAnnouncements = async () => {
    try {
      //const res = await fetch(`http://localhost:8000/api/announcements`);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/announcements`);
      const data = await res.json();
      setAnnouncements(data || []);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  const totalPages = Math.ceil(announcements.length / limit);
  const startIndex = (page - 1) * limit;
  const currentAnnouncements = announcements.slice(startIndex, startIndex + limit);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const method = editId ? "PUT" : "POST";
      /*const url = editId
        ? `http://localhost:8000/api/announcements/${editId}`
        : `http://localhost:8000/api/announcements`;
      */
      const url = editId 
      ? `${import.meta.env.VITE_API_URL}/api/announcements/${editId}`
      : `${import.meta.env.VITE_API_URL}/api/announcements`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(editId ? "Announcement updated successfully!" : "Announcement added successfully!");
        setMessageType("success");
        setFormData({ title: "", description: "" });
        setEditId(null);

        if (activeTab === "view") fetchAnnouncements();

        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 4000);
      } else {
        setMessage(data.message || "Something went wrong");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Error saving announcement:", err);
      setMessage("Server error");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      description: announcement.description,
    });
    setEditId(announcement._id);
    setActiveTab("add");
  };

  const confirmDelete = (id) => {
    setAnnouncementToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      /*const res = await fetch(
        `http://localhost:8000/api/announcements/${announcementToDelete}`,
        { method: "DELETE" }
      );
      */

      const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/announcements/${announcementToDelete}`,
      { method: "DELETE" }
      );

      if (res.ok) {
        setMessage("Announcement deleted successfully");
        setMessageType("success");

        await fetchAnnouncements();

        if (currentAnnouncements.length === 1 && page > 1) {
          setPage(page - 1);
        }
      } else {
        setMessage("Failed to delete announcement");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Error deleting announcement:", err);
      setMessage("Server or network error");
      setMessageType("error");
    } finally {
      setShowConfirmModal(false);
      setAnnouncementToDelete(null);
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage("");
    setMessageType("");
    setEditId(null);
    setFormData({ title: "", description: "" });
  };

  return (
    <div className="manage-container">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => handleTabChange("add")}
        >
          {editId ? "Edit Announcement" : "Add Announcement"}
        </button>
        <button
          className={activeTab === "view" ? "active" : ""}
          onClick={() => handleTabChange("view")}
        >
          View Announcements
        </button>
      </div>

      {/* Add/Edit Form */}
      {activeTab === "add" && (
        <div className="form-container">
          <h2>{editId ? "Edit Announcement" : "Add New Announcement"}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>

            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : editId ? "Update" : "Add"}
            </button>
          </form>

          {message && (
            <p
              className={messageType === "success" ? "success-message" : "error-message"}
            >
              {message}
            </p>
          )}
        </div>
      )}

      {/* View Announcements */}
      {activeTab === "view" && (
        <div className="view-container">
          <h2>All Announcements</h2>
          {currentAnnouncements.length === 0 ? (
            <p>No announcements found.</p>
          ) : (
            <>
              <div className="announcement-list">
                {currentAnnouncements.map((a) => (
                  <div key={a._id} className="announcement-card">
                    <div className="announcement-details">
                      <h3>{a.title}</h3>
                      <p>{a.description}</p>
                      <small>
                        UPDATE TMS: {new Date(a.updatedAt).toLocaleDateString()}{" "}
                        {new Date(a.updatedAt).toLocaleTimeString()}
                      </small>
                      <div className="announcement-actions">
                        <button className="edit-btn" onClick={() => handleEdit(a)}>Edit</button>
                        <button className="delete-btn" onClick={() => confirmDelete(a._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .map((pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`page-btn ${page === pageNumber ? "active" : ""}`}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  <button
                    className="page-btn"
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this announcement?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={handleDeleteConfirmed}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAnnouncements;
