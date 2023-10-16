import React, { useState, useEffect } from 'react';

import Table from './components/Table';
import SearchBar from './components/SearchBar';
import './App.css';
import Pagination from './components/Pagination';

function App() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);
  const lastIdx = currentPage * recordsPerPage;
  const firstIdx = lastIdx - recordsPerPage;
  const currentData = filteredData.slice(firstIdx, lastIdx);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search, data]);

  useEffect(() => {
    // Define the URL of the API or data source
    const apiUrl =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    // Replace with your API URL

    // Fetch data when the component mounts
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function changeCurrentPage(page) {
    setCurrentPage(page);
  }
  function prevPage() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  }
  function nextPage() {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  }
  function onFirst() {
    if (currentPage !== 1) setCurrentPage(1);
  }
  function onLast() {
    if (currentPage !== nPages) setCurrentPage(nPages);
  }
  function onDelete(id) {
    const dataAfterDeletion = data.filter((item) => item.id !== id);
    setData(dataAfterDeletion);
    setFilteredData(dataAfterDeletion);
  }
  function onDeleteSelected(rowsToBeDeleted) {
    const updatedData = data.filter(
      (item) => !rowsToBeDeleted.includes(item.id)
    );
    setData(updatedData);
    setFilteredData(updatedData);
  }
  function onSave(id, updatedRow) {
    const itemIndex = data.findIndex((item) => item.id === id);
    if (itemIndex != -1) {
      const updatedDataArray = [...data];
      updatedDataArray[itemIndex] = {
        ...updatedDataArray[itemIndex],
        ...updatedRow,
      };
      setData(updatedDataArray);
      setFilteredData(updatedDataArray);
    }
  }
  return (
    <div className="app">
      <SearchBar searchHandler={setSearch} style={{ margin: '3rem' }} />
      <br />
      <Table
        data={currentData}
        onDelete={onDelete}
        onSave={onSave}
        onDeleteSelected={onDeleteSelected}
      />
      <br />
      <div className="row">
        <div className="col-2"></div>
        <div className="col-10">
          <Pagination
            nPages={nPages}
            onFirst={onFirst}
            onLast={onLast}
            onPrevPage={prevPage}
            onNextPage={nextPage}
            currentPage={currentPage}
            onPageChange={changeCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
