import React, { useState } from 'react';

const UserPagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setInputPage(page);
      onPageChange(page);
    }
  };

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleInputBlur = () => {
    if (inputPage !== currentPage) {
      handlePageChange(Number(inputPage));
    }
  };

  return (
    <div>
      <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>
      <input
        type="number"
        value={inputPage}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        min="1"
        max={totalPages}
      />
      <span> of {totalPages}</span>
      <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default UserPagination;
