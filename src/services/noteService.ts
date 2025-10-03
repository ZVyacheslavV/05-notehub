import axios from 'axios';
import type { Note } from '../types/note';

const API_KEY = import.meta.env.VITE_API_NOTES_TOKEN;

const BASE_URL = 'https://notehub-public.goit.study/api/notes';

export const PER_PAGE = 10;
/* const API_ENDPOINTS = {
  SEARCH: '?search',
}; */

const noteService = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  /* tag: string = '', */
  page: number = 1,
  perPage: number = PER_PAGE
  /* sortBy: string = '' */
): Promise<NotesResponse> => {
  const params = {
    search,
    /* tag, */
    page,
    perPage,
    /* sortBy, */
  };

  const { data } = await noteService.get<NotesResponse>('', { params });

  return data;
};

export const createNote = async (
  newNote: Pick<Note, 'title' | 'content' | 'tag'>
) => {
  const { data } = await noteService.post<Note>('', newNote);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await noteService.delete(`/${noteId}`);
  return data;
};
