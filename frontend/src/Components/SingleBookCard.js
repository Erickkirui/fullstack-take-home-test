import React from 'react';
import './Styles/BookCard.css'; // Import the CSS file for additional styling

const BookCard = ({ title, author, coverPhotoURL, readingLevel, onAddToRead }) => {
  return (
    <div
      className="book-card"
      style={{ backgroundImage: `url(${coverPhotoURL})` }}
    >
      <div className="book-card-overlay">
        <div className="book-card-content">
          <h2>{title}</h2>
          <p>By {author}</p>
          <p>Reading Level: {readingLevel}</p>
          <button onClick={onAddToRead}>Add to read</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
