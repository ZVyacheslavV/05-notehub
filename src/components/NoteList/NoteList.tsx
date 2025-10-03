// import { useFetchNotes } from '../../hooks/useNotes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '../../services/noteService';

interface NoteListProps {
  /* onDelete: (id: string) => void; */
  notes: Note[];
}

const NoteList = ({ /* onDelete, */ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  // const { data, isLoading, isError } = useFetchNotes({});
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  const handleDeleteNote = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map(
        ({ id, title, content, /* createdAt, */ tag /* updatedAt */ }) => (
          <li className={css.listItem} key={id}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <button
                className={css.button}
                onClick={() => handleDeleteNote(id)}
              >
                Delete
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default NoteList;
