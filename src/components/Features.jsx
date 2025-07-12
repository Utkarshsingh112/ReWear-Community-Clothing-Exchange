import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '📦',
      title: 'Upload Clothes',
      description: 'Share your unused clothing items with the community'
    },
    {
      icon: '🔄',
      title: 'Swap & Exchange',
      description: 'Find items you love and swap with other members'
    },
    {
      icon: '⭐',
      title: 'Earn Points',
      description: 'Build your reputation and earn points for contributions'
    }
  ];

  return (
    <section className="features-section">
      <h3>How It Works</h3>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features; 