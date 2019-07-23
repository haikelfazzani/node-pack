import React from 'react';

export default function Pagination({ pagination, setPagination, lstPackages }) {

  const step = 5;  

  return (
    <nav aria-label="Page navigation example" className="mt-3">
      <ul className="pagination">

        <li className={pagination.prev <= 0 ? "page-item disabled" : "page-item"}>
          <button className="page-link"
            onClick={() => pagination.prev > 0 &&
              setPagination({ next: pagination.next - step, prev: pagination.prev - step })}>
            Previous
          </button>
        </li>

        <li className={pagination.next < lstPackages.length  ? "page-item" : "page-item disabled"}>
          <button className="page-link"
            onClick={() => pagination.next < lstPackages.length &&
              setPagination({ next: pagination.next + step, prev: pagination.prev + step })}>
            Next
          </button>
        </li>
        
      </ul>
    </nav>
  );
}
