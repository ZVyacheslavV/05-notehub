import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginate = ({ currentPage, totalPages, onPageChange }: PaginateProps) => (
  <ReactPaginate
    pageCount={totalPages}
    pageRangeDisplayed={5}
    marginPagesDisplayed={1}
    onPageChange={({ selected }) => onPageChange(selected + 1)}
    forcePage={currentPage - 1}
    containerClassName={css.pagination}
    activeClassName={css.active}
    nextLabel="→"
    previousLabel="←"
  />
);

export default Paginate;
