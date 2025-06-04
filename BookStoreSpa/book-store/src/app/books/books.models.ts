import { Book } from './book.model';

export interface BooksState {
  books: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
}

export const initialBooksState: BooksState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
};
