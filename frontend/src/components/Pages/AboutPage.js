  import React from 'react';
  import './AboutPage.css';

  function AboutPage() {
    return (
      <div className="about-page">
        <div className="about-image">
          <img src={'https://5.imimg.com/data5/SELLER/Default/2023/4/297383209/HS/BJ/JG/137384514/handmade-woodland-animals-felt-toy-set-fox-bunny-bear-deer-and-raccoon-dolls-500x500.png'} alt="Handmade and Craft Marketplace" />
        </div>
        <div className="about-content">
          <h1>About Us</h1>
          <p>
            Welcome to our Handmade and Craft Marketplace! We are a dedicated platform that connects talented artisans and craft makers with customers who appreciate the art of handmade goods. Our mission is to support and promote the craftsmanship that goes into creating unique, high-quality products.
          </p>
          <p>
            Join us in celebrating the creativity and hard work of artisans from around the world. Discover beautiful handmade items, support small businesses, and add a touch of uniqueness to your life.
          </p>
        </div>
      </div>
    );
  }

  export default AboutPage;
