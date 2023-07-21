import React from 'react';
import Pagination from 'react-js-pagination';

export type OnHandler = {
  (pageNumber: number): void;
};

export interface PageProps {
  onHandler: OnHandler;
  paging?: number;
  perPage?: number;
  totalCount?: number;
}
const Paging = ({ totalCount = 0, paging = 1, perPage = 10, onHandler }: PageProps) => {
  return (
    <Pagination
      activePage={paging}
      itemsCountPerPage={perPage}
      totalItemsCount={totalCount}
      pageRangeDisplayed={10}
      prevPageText={'<'}
      nextPageText={'>'}
      onChange={onHandler}
      itemClass="inline-block px-3 py-1 mx-1 rounded border border-gray-400 bg-gray-100 text-slate-500 cursor-pointer"
      activeClass="font-bold bg-blue-500 text-slate-900"
    />
  );
};

export default Paging;
