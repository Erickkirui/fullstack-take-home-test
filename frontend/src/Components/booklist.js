import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import BookCard from './SingleBookCard';
import ToReadList from './ToReadList';
import './Styles/BookList.css';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [toReadBooks, setToReadBooks] = useState([]);
  const booksPerPage = 9;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Calculate the books to display on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = data.books.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const addToRead = (book) => {
    setToReadBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <div>
      <h1>Book List</h1>
      <div className="book-list">
        {currentBooks.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            coverPhotoURL={book.coverPhotoURL}
            readingLevel={book.readingLevel}
            onAddToRead={() => addToRead(book)}
          />
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className="page-number">
            {number}
          </button>
        ))}
      </div>
      <ToReadList books={toReadBooks} />
    </div>
  );
};

export default BookList;
