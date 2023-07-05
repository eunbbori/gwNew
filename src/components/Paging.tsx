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
const Paging: React.FC<PageProps> = ({ totalCount = 0, paging = 1, perPage = 10, onHandler }) => {
  return (
    <div className="flex justify-center mt-4">
      <Pagination
        activePage={paging}
        itemsCountPerPage={perPage}
        totalItemsCount={totalCount}
        pageRangeDisplayed={10}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={onHandler}
        itemClass="inline-block px-3 py-1 mx-1 rounded bg-blue-200 text-blue-600 cursor-pointer"
        activeClass="font-bold bg-blue-500 text-white"
      />
    </div>
  );
};

export default Paging;
