import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    contactNo: '',
    feedback: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [messageType, setMessageType] = useState(''); // ✅ track message type

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (value.trim()) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const requiredFields = ['name', 'address', 'contactNo', 'feedback'];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage('');
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setFadeOut(false);

    try {
      // 1️⃣ Call backend API to store feedback
      const response = await fetch('http://localhost:8000/api/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          email: formData.email || '',
          contactNumber: formData.contactNo,
          message: formData.feedback
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error saving feedback');

      console.log('Feedback saved:', data);

      // 2️⃣ Send email via EmailJS
      await emailjs.send(
        'service_h5s5ec9',
        'template_yxq0g1q',
        {
          name: formData.name,
          address: formData.address,
          email: formData.email || 'Not provided',
          contactNo: formData.contactNo,
          feedback: formData.feedback,
          to_email: 'ramanuj.sitarammath@gmail.com',
        },
        'Sa_hFVnikBfXN9Cx_'
      );

      // Reset form
      setFormData({
        name: '',
        address: '',
        email: '',
        contactNo: '',
        feedback: '',
      });
      setErrors({});
      setMessageType('success'); // ✅ green for success
      setSuccessMessage('Thank you for your feedback! Our team will reach out to you at the earliest.');

      setTimeout(() => setFadeOut(true), 3000);
      setTimeout(() => {
        setSuccessMessage('');
        setFadeOut(false);
      }, 4000);

    } catch (err) {
      console.error('Error:', err);
      setMessageType('error'); // ✅ red for error
      setSuccessMessage('There was an error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <button className="top-left-btn" onClick={() => navigate('/')}>
        ← Back to Homepage
      </button>

      <div className="feedback-section">
        <h2>Please Share Your Feedback / Query</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            name="name"
            placeholder="Name (Mandatory)"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}

          <input
            type="text"
            name="address"
            placeholder="Address (Mandatory)"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}

          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contactNo"
            placeholder="Contact Number (Mandatory)"
            value={formData.contactNo}
            onChange={handleChange}
            className={errors.contactNo ? 'error' : ''}
          />
          {errors.contactNo && <span className="error-message">{errors.contactNo}</span>}

          <textarea
            name="feedback"
            placeholder="Your Queries / Feedback (Mandatory)"
            value={formData.feedback}
            onChange={handleChange}
            className={errors.feedback ? 'error' : ''}
          />
          {errors.feedback && <span className="error-message">{errors.feedback}</span>}

          <button type="submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : 'Submit'}
          </button>

          {successMessage && (
            <div className={`thank-you-popup ${messageType} ${fadeOut ? 'fade-out' : ''}`}>
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
