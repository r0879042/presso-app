import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import "../styles/Search.scss";
import searchIcon from "../assets/icons/searchLoop.svg";

export default function SearchBar({ data, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setSearchTerm(item.name);
    setSuggestions([]);
    onSelect(item); // Callback to parent
  };

  return (
    <div className="search-bar-container">
      <div className='search-bar'>
        <img src={searchIcon} alt="Search" className='search-icon' />
        <Form.Control
          type="text"
          placeholder="Search capsules..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
