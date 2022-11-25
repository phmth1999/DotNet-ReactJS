import React from "react";
import {Button} from "antd";
export const Pagination = ({ dataPerPage, totalData,paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav style={{height:35, marginTop:0}}>
      <ul className="pagination"  style={{ marginRight: 30,marginTop:2.5 }}>
        {pageNumber.map((number) => (
          <li key={number} className="page-item" style={{}}>
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
