import React from 'react';
import BookCard from './SingleBookCard';
import './Styles/ToReadList.css';

const ToReadList = ({ books = [] }) => {
  return (
    <div>
      <h1>To Read List</h1>
      <div className="to-read-list">
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            coverPhotoURL={book.coverPhotoURL}
            readingLevel={book.readingLevel}
          />
        ))}
      </div>
    </div>
  );
};

export default ToReadList;
