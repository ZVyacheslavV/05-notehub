import { useState } from 'react';
import css from './App.module.css';
import { useFetchNotes } from '../../hooks/useFetchNotes';
import NoteList from '../NoteList/NoteList';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import EmptyListMessage from '../EmptyListMessage/EmptyListMessage';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
/* import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote , deleteNote } from '../../services/noteService';
import type { FormikHelpers } from 'formik';
import type { Note } from '../../types/note'; */

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  /* const queryClient = useQueryClient(); */

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value.trim());
      setCurrentPage(1);
    },
    500
  );

  // const [inputValue, setInputValue] = useState('');

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  //   debouncedSearch(e.target.value);
  // };

  // const debouncedSearch = useDebouncedCallback((value: string) => {
  //   setSearchQuery(value.trim());
  //   setCurrentPage(1);
  // }, 500);

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

  /*   const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
  });

  const handleCreateNote = async (
    values: Pick<Note, 'title' | 'content' | 'tag'>,
    actions: FormikHelpers<Pick<Note, 'title' | 'content' | 'tag'>>
  ) => {
    createNoteMutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  }; */

  /*   const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  const handleDeleteNote = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  }; */

  /*   const handleCreateNote = async (values: {
    title: string;
    content: string;
    tag: string;
  }) => {
    createNoteMutation.mutate(values);
  }; */

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} defaultValue={searchQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
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
          <NoteForm
            onClose={closeModal}
            setIsOpen={setIsModalOpen}
            /* onSubmit={handleCreateNote} */
            /* isSubmitting={createNoteMutation.isPending} */
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
