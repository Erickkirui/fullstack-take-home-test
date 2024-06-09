import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Alert } from '@mui/material';
import BookCard from './SingleBookCard';
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

const BookList = ({ addToRead }) => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const booksPerPage = 9;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredBooks = data.books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToList = (book) => {
    // Perform any necessary actions when adding to the list
    // Show the alert
    setShowAlert(true);
    // Add the book to the reading list
    addToRead(book);
    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBooks.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="I am looking for ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <div style={{ marginTop: '10px' }}>
        {/* Material UI Alert */}
        {showAlert && (
          <Alert variant="filled" severity="success">
            Book Added to your Reading list
          </Alert>
        )}
      </div>

      {/* Book list */}
      <div className="book-list">
        {currentBooks.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            coverPhotoURL={book.coverPhotoURL}
            readingLevel={book.readingLevel}
            onAddToRead={() => handleAddToList(book)} // Modified to call handleAddToList
          />
        ))}
      </div>

      {/* Pagination */}
      <p>More books</p>
      <div className="pagination">
      
        {pageNumbers.map((number) => (
          
          <button key={number} onClick={() => paginate(number)} className="page-number">
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;
