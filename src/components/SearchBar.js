import React from 'react';

export default function SearchBar(props) {
  const { searchHandler } = props;
  return (
    <div>
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Search by name , email or role"
        onChange={($event) => searchHandler($event.target.value)}
      ></input>
    </div>
  );
}
