import React from 'react';
import BookCard from './SingleBookCard';
import './Styles/ToReadList.css';

const ToReadList = ({ books = [], removeFromToRead }) => {
  return (
    <div>
      <div className="to-read-list">
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            coverPhotoURL={book.coverPhotoURL}
            readingLevel={book.readingLevel}
            onRemove={() => removeFromToRead(book)}
          />
        ))}
      </div>
    </div>
  );
};

export default ToReadList;
