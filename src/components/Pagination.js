import React from 'react';

export default function Pagination(props) {
  const {
    currentPage,
    onPageChange,
    onPrevPage,
    onNextPage,
    nPages,
    onFirst,
    onLast,
  } = props;
  const numbers = [...Array(nPages + 1).keys()].slice(1);
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="onFirst"
            onClick={() => onFirst()}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={() => onPrevPage()}
          >
            <span aria-hidden="true">&lt;</span>
          </a>
        </li>
        {numbers?.map((number, index) => {
          return (
            <li
              className={`page-item ${currentPage == number ? 'active' : ''}`}
              key={index}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => onPageChange(number)}
              >
                {number}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="onNext"
            onClick={() => onNextPage()}
          >
            <span aria-hidden="true">&gt;</span>
          </a>
        </li>
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="onLast"
            onClick={() => onLast()}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
