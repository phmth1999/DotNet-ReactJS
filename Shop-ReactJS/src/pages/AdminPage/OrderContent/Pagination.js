import React from "react";
import {Button} from "antd";
export const Pagination = ({ dataPerPage, totalData,paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <Button 
            className="page-link" 
            onClick={() => paginate(number)}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
