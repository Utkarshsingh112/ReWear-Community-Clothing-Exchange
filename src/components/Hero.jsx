import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <h2>Swap Clothes, Save the Planet</h2>
      <p>
        ReWear is a web platform that lets users swap unused clothes or redeem them using earned points. 
        It promotes sustainable fashion by reducing waste and giving garments a second life through a simple, 
        community-driven exchange system.
      </p>
      <div className="cta-buttons">
        <button className="btn btn-primary">Start Swapping</button>
        <button className="btn btn-secondary">Learn More</button>
      </div>
    </section>
  );
};

export default Hero; 