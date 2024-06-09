import React from 'react';
import './Styles/BookCard.css'; // Import the CSS file for additional styling

const BookCard = () => {
  const backgroundImage = '/images/image1.webp'; // Update the path to your image

  return (
    <div
      className="book-card"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="book-card-overlay">
        <div className="book-card-content">
          <h2>Curious Princess and the Enchanted Garden</h2>
          <p>By Reese Smith</p>
          <button>Add to read</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
