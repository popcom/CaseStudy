import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadBooks,
  deleteBook,
} from '../books.actions';
import {
  selectAllBooks,
  selectBooksError,
  selectBooksLoading,
} from '../books.selectors';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  imports: [DatePipe, RouterModule],
})
export class BookListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  books$: Observable<Book[]> = this.store.select(selectAllBooks);
  isFetching$ = this.store.select(selectBooksLoading);
  error$ = this.store.select(selectBooksError);

  ngOnInit() {
    this.store.dispatch(loadBooks());
  }

  onCreateBook() {
    this.router.navigate(['create/']);
  }

  onDeleteBook(id: string) {
    this.store.dispatch(deleteBook({ id }));
  }

  trackBook(_: number, book: Book): string | null {
    return book.id;
  }
}
