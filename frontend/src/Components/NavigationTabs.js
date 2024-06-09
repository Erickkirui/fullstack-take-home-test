import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BookList from './booklist';
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

export default function NavTabs({ toReadBooks }) { // Accept toReadBooks as a prop
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <LinkTab label="List of All Books" href="/all-books" />
        <LinkTab label="Selected Books" href="/selected-books" />
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {value === 0 &&  <BookList />}
        {value === 1 && <ToReadList books={toReadBooks} />}
      </Box>
    </Box>
  );
}
