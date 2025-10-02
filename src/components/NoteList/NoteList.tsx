// import { useFetchNotes } from '../../hooks/useNotes';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  /* onSelect: (note: Note) => void; */
  notes: Note[];
}

const NoteList = ({ /* onSelect, */ notes }: NoteListProps) => (
  // const { data, isLoading, isError } = useFetchNotes({});

  <ul className={css.list}>
    {notes.map(
      ({ id, title, content, /* createdAt, */ tag /* updatedAt */ }) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      )
    )}
  </ul>
);

export default NoteList;
