import { createReducer, on } from '@ngrx/store';
import {
  loadBooks,
  loadBooksSuccess,
  loadBooksFailure,
  loadBookSuccess,
  createBookSuccess,
  updateBookSuccess,
  deleteBookSuccess,
} from './books.actions';
import { initialBooksState } from './books.models';

export const booksReducer = createReducer(
  initialBooksState,
  on(loadBooks, (state) => ({ ...state, loading: true, error: null })),
  on(loadBooksSuccess, (state, { books }) => ({
    ...state,
    loading: false,
    books,
  })),
  on(loadBooksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadBookSuccess, (state, { book }) => ({ ...state, selectedBook: book })),
  on(createBookSuccess, updateBookSuccess, deleteBookSuccess, (state) => ({
    ...state,
    loading: false,
  }))
);
