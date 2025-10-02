import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../services/noteService';
// import type { Note } from '../types/note';

interface UseNotesOptions {
  search: string;
  /* tag?: string; */
  page?: number;
  perPage?: number;
  /* sortBy?: string; */
}

export const useFetchNotes = ({
  search,
  /* tag = '', */
  page /*  = 1 */,
  perPage /*  = 10 */,
}: /* sortBy = '', */
UseNotesOptions) => {
  return useQuery({
    queryKey: ['notes', search, /* tag, */ page, perPage /* , sortBy */],
    queryFn: () => fetchNotes(search, /* tag, */ page, perPage /* , sortBy */),
    /* enabled: search !== '', */
    placeholderData: keepPreviousData,
    /* keepPreviousData: true; */
  });
};
