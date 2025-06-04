import { createAction, props } from '@ngrx/store';
import { Book } from './book.model';
import { CreateBook } from './create-book.model';

export const loadBooks = createAction('[Books] Load Books');
export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: Book[] }>()
);
export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: string }>()
);

export const loadBook = createAction('[Books] Load Book', props<{ id: string }>());
export const loadBookSuccess = createAction(
  '[Books] Load Book Success',
  props<{ book: Book }>()
);
export const loadBookFailure = createAction(
  '[Books] Load Book Failure',
  props<{ error: string }>()
);

export const createBook = createAction(
  '[Books] Create Book',
  props<{ book: CreateBook }>()
);
export const createBookSuccess = createAction('[Books] Create Book Success');
export const createBookFailure = createAction(
  '[Books] Create Book Failure',
  props<{ error: string }>()
);

export const updateBook = createAction(
  '[Books] Update Book',
  props<{ id: string; book: CreateBook }>()
);
export const updateBookSuccess = createAction('[Books] Update Book Success');
export const updateBookFailure = createAction(
  '[Books] Update Book Failure',
  props<{ error: string }>()
);

export const deleteBook = createAction('[Books] Delete Book', props<{ id: string }>());
export const deleteBookSuccess = createAction('[Books] Delete Book Success');
export const deleteBookFailure = createAction(
  '[Books] Delete Book Failure',
  props<{ error: string }>()
);
