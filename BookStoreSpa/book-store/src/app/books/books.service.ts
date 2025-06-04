import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

import { Book } from "./book.model";
import { catchError, map, throwError } from "rxjs";
import { CreateBook } from "./create-book.model";

@Injectable({
    providedIn: 'root',
  })
export class BooksService {
  private httpClient = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;


  getAllBooks() {
    return this.httpClient.get<Book[]>(`${this.apiBaseUrl}/books`).pipe(
        map((resData) => resData),
        catchError((error) => {
          return throwError(() => new Error('Something went wrong fetching the available books. Please try again later.'));
        })
      );
  }

  getBookById(id: string){
    return this.httpClient.get<Book>(`${this.apiBaseUrl}/books/` + id).pipe(
      map((resData) => resData),
      catchError((error) => {
        return throwError(() => new Error('Something went wrong fetching the book. Please try again later.'));
      })
    );
  }

  postCreateBook(book: CreateBook){
    return this.httpClient.post<string>(`${this.apiBaseUrl}/books/`, book).pipe(
      map((resData) => resData),
      catchError((error) => {
        return throwError(() => new Error('Something went wrong creating the book. Please try again later.'));
      })
    );
  }

  putUpdateBook(id: string, book: CreateBook){
    return this.httpClient.put<boolean>(`${this.apiBaseUrl}/books/` + id, book).pipe(
      map((resData) => resData),
      catchError((error) => {
        return throwError(() => new Error('Something went wrong updating the book. Please try again later.'));
      })
    );
  }

  deleteRemoveBook(id: string){
    return this.httpClient.delete<boolean>(`${this.apiBaseUrl}/books/` + id).pipe(
      map((resData) => resData),
      catchError((error) => {
        return throwError(() => new Error('Something went wrong removing the book. Please try again later.'));
      })
    );
  }

  }
