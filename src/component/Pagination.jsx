import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'; // CSS 파일 경로는 적절히 수정하세요

const Pagination = ({ pageCount, onPageChange, forcePage }) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      forcePage={forcePage} // 현재 페이지 강제 설정
    />
  );
};

export default Pagination;
