import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  imports: [DatePipe, RouterModule],
})
export class BookListComponent implements OnInit {
  books = signal<Book[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private booksService = inject(BooksService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  ngOnInit() {
    this.isFetching.set(true);
    this.loadData();
  }

  loadData(){
    const subscription = this.booksService.getAllBooks().subscribe({
      next: (res) => {
        this.books.set(res);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onCreateBook(){
    this.router.navigate(['create/']);
  }

  onDeleteBook(id: string){
    const subscription = this.booksService.deleteRemoveBook(id).subscribe({
      next: (res) => {
        console.log('The Book Removed:', id);
        this.loadData();
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }
}
