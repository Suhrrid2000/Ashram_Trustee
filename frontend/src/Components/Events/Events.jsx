import React, { useEffect, useState } from "react";
import "./Events.css";

const PLACEHOLDER = "/placeholder.jpg";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 5;

  const getEventImages = (evt) => {
    const arr = Array.isArray(evt?.images) ? evt.images.filter(Boolean) : [];
    if (arr.length > 0) return arr;
    if (evt?.imageUrl) return [evt.imageUrl];
    return [];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, announcementsRes] = await Promise.all([
          //fetch("http://localhost:8000/api/events"),
          //fetch("http://localhost:8000/api/announcements"),

          fetch(`${import.meta.env.VITE_API_URL}/api/events`),
          fetch(`${import.meta.env.VITE_API_URL}/api/announcements`),
        ]);

        const eventsData = await eventsRes.json();
        const announcementsData = await announcementsRes.json();

        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setAnnouncements(Array.isArray(announcementsData) ? announcementsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    const imgs = getEventImages(selectedEvent);
    if (imgs.length <= 1) return;

    const id = setInterval(() => {
      setCarouselIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(id);
  }, [selectedEvent]);

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const currentEvents = events.slice(startIndex, startIndex + EVENTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const eventsSection = document.querySelector(".events-section-title");
    if (eventsSection) {
      const yOffset = -80;
      const y = eventsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ));
    }

    const pages = [];
    const showLeftDots = currentPage > 3;
    const showRightDots = currentPage < totalPages - 2;

    const startPages = [1, 2];
    const endPages = [totalPages - 1, totalPages];

    if (!showLeftDots) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (!showRightDots) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, currentPage - 1, currentPage, currentPage + 1, totalPages);
    }

    return (
      <>
        {startPages.map((num) => (
          <button
            key={num}
            className={`pagination-btn ${currentPage === num ? "active" : ""}`}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}
        {showLeftDots && <span className="dots">...</span>}
        {currentPage > 2 && currentPage < totalPages - 1 && (
          <>
            {currentPage - 1 > 2 && (
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </button>
            )}
            <button className="pagination-btn active">{currentPage}</button>
            {currentPage + 1 < totalPages - 1 && (
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
            )}
          </>
        )}
        {showRightDots && <span className="dots">...</span>}
        {endPages.map((num) => (
          <button
            key={num}
            className={`pagination-btn ${currentPage === num ? "active" : ""}`}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <div className="events-container">
        <p className="events-loading-text">Loading...</p>
      </div>
    );
  }

  if (selectedEvent) {
    const images = getEventImages(selectedEvent);
    const activeSrc = images[carouselIndex] || PLACEHOLDER;

    return (
      <div className="events-container">
        <div className="event-detail-wrapper">
          <button
            className="back-button"
            onClick={() => {
              setSelectedEvent(null);
              setCarouselIndex(0);
            }}
          >
            ← Back
          </button>

          <div className="event-detail">
            <div className="event-detail-image-container">
              <img
                src={activeSrc}
                alt={selectedEvent?.name || "Event image"}
                className="event-detail-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = PLACEHOLDER;
                }}
              />
            </div>

            <div className="event-detail-info">
              <h2>{selectedEvent?.name}</h2>
              <p>
                <strong>Location:</strong> {selectedEvent?.location || "—"}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedEvent?.date)}
              </p>
              <p>{selectedEvent?.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="events-container">
      <div className="content-wrapper">
        {/* Sidebar Announcements */}
        <aside className="announcements-sidebar">
          <h2>Latest Announcements</h2>
          {announcements.length === 0 ? (
            <p>No announcements available.</p>
          ) : (
            <ul>
              {announcements.map((a, idx) => (
                <li key={idx}>
                  <h4>{a.title}</h4>
                  <p>{a.description}</p>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Main Events Section */}
        <main className="events-main">
          <h2 className="events-section-title">Recent & Upcoming Events</h2>
          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            <>
              <ul className="events-list">
                {currentEvents.map((evt) => {
                  const imgs = getEventImages(evt);
                  const cover = imgs[0] || PLACEHOLDER;

                  return (
                    <li className="event-item" key={evt._id}>
                      <img
                        src={cover}
                        alt={evt?.name || "Event image"}
                        className="event-thumbnail"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = PLACEHOLDER;
                        }}
                      />
                      <div className="event-info">
                        <h3>{evt?.name}</h3>
                        <p className="event-meta">
                          <strong>Date:</strong> {formatDate(evt?.date)} |{" "}
                          <strong>Location:</strong> {evt?.location || "—"}
                        </p>
                        <p className="event-description">
                          {evt?.description && evt.description.length > 100
                            ? `${evt.description.substring(0, 100)}...`
                            : evt?.description}
                        </p>
                        <button
                          className="read-more-btn"
                          onClick={() => {
                            setSelectedEvent(evt);
                            setCarouselIndex(0);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Read More
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    «
                  </button>
                  {renderPageNumbers()}
                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    »
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Events;


