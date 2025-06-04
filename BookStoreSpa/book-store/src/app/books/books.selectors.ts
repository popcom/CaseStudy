import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.models';

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectAllBooks = createSelector(
  selectBooksState,
  (state) => state.books
);

export const selectBooksLoading = createSelector(
  selectBooksState,
  (state) => state.loading
);

export const selectBooksError = createSelector(
  selectBooksState,
  (state) => state.error
);

export const selectCurrentBook = createSelector(
  selectBooksState,
  (state) => state.selectedBook
);
