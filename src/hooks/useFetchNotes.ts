import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes, PER_PAGE } from '../services/noteService';

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
  page = 1,
  perPage = PER_PAGE,
}: /* sortBy = '', */
UseNotesOptions) => {
  return useQuery({
    queryKey: ['notes', { search, /* tag, */ page, perPage /* , sortBy */ }],
    queryFn: () => fetchNotes(search, /* tag, */ page, perPage /* , sortBy */),
    placeholderData: keepPreviousData,
  });
};
