import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import BookCard from './singlebookcard';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Book List</h1>
      <div className="book-list">
        {data.books.map((book, index) => (
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

export default BookList;
