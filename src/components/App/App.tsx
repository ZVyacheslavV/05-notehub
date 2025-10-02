import { useState } from 'react';
import css from './App.module.css';
import { useFetchNotes } from '../../hooks/useFetchNotes';
import NoteList from '../NoteList/NoteList';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import EmptyListMessage from '../EmptyListMessage/EmptyListMessage';
import Paginate from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /*   const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value.trim());
      setCurrentPage(1);
    },
    500
  ); */

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value.trim());
    setCurrentPage(1);
  }, 500);

  const {
    data: { notes = [], totalPages = 0 } = {},
    isFetching,
    isError,
    isSuccess,
  } = useFetchNotes({
    search: searchQuery,
    page: currentPage,
  });

  /*   const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0; */

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} value={inputValue} />
        {isSuccess && totalPages > 1 && (
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isFetching && <Loading />}
      {notes.length > 0 && <NoteList notes={notes} />}
      {notes.length === 0 && !isFetching && !isError && <EmptyListMessage />}
      {isError && <Error />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm />
        </Modal>
      )}
    </div>
  );
};

export default App;
