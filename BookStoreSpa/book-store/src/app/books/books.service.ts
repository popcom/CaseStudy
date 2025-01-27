import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

import { Book } from "./book.model";
import { catchError, map, throwError } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class BooksService {
    private httpClient = inject(HttpClient);
    private books = signal<Book[]>([]);

  loadedBooks = this.books.asReadonly();

  getAllBooks() {
    // return this.fetchPlaces(
    //   'http://localhost:3000/places',
    //   'Something went wrong fetching the available places. Please try again later.'
    // );
    return this.httpClient.get<Book[]>('https://localhost:7162/api/books').pipe(
        map((resData) => resData),
        catchError((error) => {
          return throwError(() => new Error('Something went wrong fetching the available books. Please try again later.'));
        })
      );
  }

  getBookById(id: string){
    return this.httpClient.get<Book>(`https://localhost:7162/api/books/` + id).pipe(
      map((resData) => resData),
      catchError((error) => {
        return throwError(() => new Error('Something went wrong fetching the available books. Please try again later.'));
      })
    );
  }

  }