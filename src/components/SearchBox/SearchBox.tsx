import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchBox = ({ onChange, value }: SearchBoxProps) => (
  <input
    className={css.input}
    onChange={onChange}
    type="text"
    placeholder="Search notes"
    value={value}
  />
);
export default SearchBox;
