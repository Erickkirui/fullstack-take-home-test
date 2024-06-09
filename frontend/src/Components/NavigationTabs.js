import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BookList from './BookList';
import ToReadList from './ToReadList';

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected ? 'page' : undefined}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = useState(0);
  const [toReadBooks, setToReadBooks] = useState([]);

  useEffect(() => {
    const storedToReadBooks = localStorage.getItem('toReadBooks');
    if (storedToReadBooks) {
      setToReadBooks(JSON.parse(storedToReadBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toReadBooks', JSON.stringify(toReadBooks));
  }, [toReadBooks]);

  const addToRead = (book) => {
    setToReadBooks((prevBooks) => {
      if (!prevBooks.some((b) => b.title === book.title)) {
        return [...prevBooks, book];
      }
      return prevBooks;
    });
  };

  const handleChange = (event, newValue) => {
    if (samePageLinkNavigation(event)) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Tabs
        sx={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <LinkTab label="List of All Books" href="/all-books" />
        <LinkTab label="Selected Books" href="/selected-books" />
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {value === 0 && <BookList addToRead={addToRead} />}
        {value === 1 && <ToReadList books={toReadBooks} />}
      </Box>
    </Box>
  );
}
