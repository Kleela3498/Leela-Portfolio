import React, { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaUser, FaComment, FaRocket } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldMessage = (field) => {
    const messages = {
      name: "What should I call you? 👋",
      email: "Where can I reach you? 📧",
      message: "Don't worry, I don't byte! 💬"
    };
    return focusedField === field ? messages[field] : '';
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <BsStars className="contact-star" />
        <h2>Let's Connect!</h2>
        <BsStars className="contact-star" />
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className={`form-group ${formData.name ? 'has-value' : ''}`}>
          <div className="input-icon">
            <FaUser />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
            placeholder="Your Name"
            required
            className="form-input"
          />
          <span className="field-message">{getFieldMessage('name')}</span>
        </div>

        <div className={`form-group ${formData.email ? 'has-value' : ''}`}>
          <div className="input-icon">
            <FaEnvelope />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            placeholder="Your Email"
            required
            className="form-input"
          />
          <span className="field-message">{getFieldMessage('email')}</span>
        </div>

        <div className={`form-group ${formData.message ? 'has-value' : ''}`}>
          <div className="input-icon">
            <FaComment />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            placeholder="Your Message"
            required
            className="form-input message-input"
          />
          <span className="field-message">{getFieldMessage('message')}</span>
        </div>

        <button 
          type="submit" 
          className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          <span className="button-content">
            {isSubmitting ? (
              <>
                Launching Message <FaRocket className="rocket-icon" />
              </>
            ) : (
              <>
                Send Message <FaPaperPlane className="send-icon" />
              </>
            )}
          </span>
        </button>
      </form>

      {showSuccess && (
        <div className="success-message">
          <BsStars className="success-star" />
          <p>Message launched into the digital cosmos! 🚀</p>
          <BsStars className="success-star" />
        </div>
      )}
    </div>
  );
};

export default Contact;