import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { BookCardComponent } from '../book-card/book-card.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { BookEditComponent } from '../book-edit/book-edit.component';

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

  onEditBook(id: string){
    //this.router.navigate(['edit/', id]);
    this.router.navigate(['edit/', id], {
      replaceUrl: true,
    });
  }
}
