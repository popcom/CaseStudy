import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksService } from './books.service';
import {
  loadBooks,
  loadBooksSuccess,
  loadBooksFailure,
  loadBook,
  loadBookSuccess,
  loadBookFailure,
  createBook,
  createBookSuccess,
  createBookFailure,
  updateBook,
  updateBookSuccess,
  updateBookFailure,
  deleteBook,
  deleteBookSuccess,
  deleteBookFailure,
} from './books.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions, private booksService: BooksService) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      switchMap(() =>
        this.booksService.getAllBooks().pipe(
          map((books) => loadBooksSuccess({ books })),
          catchError((error) => of(loadBooksFailure({ error: error.message })))
        )
      )
    )
  );

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBook),
      mergeMap(({ id }) =>
        this.booksService.getBookById(id).pipe(
          map((book) => loadBookSuccess({ book })),
          catchError((error) => of(loadBookFailure({ error: error.message })))
        )
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBook),
      mergeMap(({ book }) =>
        this.booksService.postCreateBook(book).pipe(
          map(() => createBookSuccess()),
          catchError((error) => of(createBookFailure({ error: error.message })))
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBook),
      mergeMap(({ id, book }) =>
        this.booksService.putUpdateBook(id, book).pipe(
          map(() => updateBookSuccess()),
          catchError((error) => of(updateBookFailure({ error: error.message })))
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBook),
      mergeMap(({ id }) =>
        this.booksService.deleteRemoveBook(id).pipe(
          map(() => deleteBookSuccess()),
          catchError((error) => of(deleteBookFailure({ error: error.message })))
        )
      )
    )
  );
}
