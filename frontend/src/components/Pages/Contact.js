import React, { useState } from 'react';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address.');
      return;
    }

    setError('');
    // Handle form submission (e.g., send data to the server)
    console.log({ name, email, message });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">We'd love to hear from you! Fill out the form below and we'll get in touch with you shortly.</p>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="contact-input" 
          placeholder="Your Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" 
          className="contact-input" 
          placeholder="Your Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea 
          className="contact-textarea" 
          placeholder="Your Message" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        {error && <p className="contact-error">{error}</p>}
        <button type="submit" className="contact-submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactPage;
