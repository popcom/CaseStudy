import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Book } from "./book.model";
import { catchError, map, throwError } from "rxjs";
import { CreateBook } from "./create-book.model";

@Injectable({
    providedIn: 'root',
  })
  export class BooksService {
    private httpClient = inject(HttpClient);


  getAllBooks() {
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
        return throwError(() => new Error('Something went wrong fetching the book. Please try again later.'));
      })
    );
  }

  postCreateBook(book: CreateBook){
    return this.httpClient.post<string>('https://localhost:7162/api/books/', book).pipe(
      map((resData) => resData),
      catchError((error) => {
        return throwError(() => new Error('Something went wrong creating the book. Please try again later.'));
      })
    );
  }

  putUpdateBook(id: string, book: CreateBook){
    return this.httpClient.put<boolean>(`https://localhost:7162/api/books/` + id, book).pipe(
      map((resData) => resData),
      catchError((error) => {
        return throwError(() => new Error('Something went wrong updating the book. Please try again later.'));
      })
    );
  }

  deleteRemoveBook(id: string){
    return this.httpClient.delete<boolean>('https://localhost:7162/api/books/' + id).pipe(
      map((resData) => resData),
      catchError((error) => {
        return throwError(() => new Error('Something went wrong removing the book. Please try again later.'));
      })
    );
  }

  }