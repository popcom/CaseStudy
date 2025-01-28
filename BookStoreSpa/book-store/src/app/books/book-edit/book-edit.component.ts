import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';
import { CreateBook } from '../create-book.model';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent {
  private bookService = inject(BooksService)
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  bookForm: FormGroup;
  isEditMode = signal(false);
  currentBookId = signal<string | null>(null);
  currentBook = signal<CreateBook | null>(null);

  constructor() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      isbn: [''],
      imgUrl: [''],
      publishedDate: [],
    });

    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.isEditMode.set(true);
      this.currentBookId.set(bookId);
      const subscription = this.bookService.getBookById(bookId).subscribe({
        next: (book) => {
          if(book.publishedDate){
            const date = new Date(book.publishedDate);
            book.publishedDate = date.toLocaleDateString('en-CA');
          }
          this.currentBook.set(book);
          this.bookForm.controls["title"].setValue(this.currentBook()?.title);
          this.bookForm.controls["author"].setValue(this.currentBook()?.author);
          this.bookForm.controls["description"].setValue(this.currentBook()?.description);
          this.bookForm.controls["imgUrl"].setValue(this.currentBook()?.imgUrl);
          this.bookForm.controls["isbn"].setValue(this.currentBook()?.isbn);
          this.bookForm.controls["publishedDate"].setValue(this.currentBook()?.publishedDate);
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  onCancel(){
    this.router.navigate(['books/']);
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const bookData = this.bookForm.value;
    const book: CreateBook = {
      imgUrl: bookData["imgUrl"],
      isbn: bookData["isbn"],
      publishedDate: bookData["publishedDate"],
      author : bookData["author"],
      description : bookData["description"],
      title : bookData["title"],
    }
    
    if (this.isEditMode()) {
      const subscription = this.bookService.putUpdateBook(this.currentBookId()!, book).subscribe({
        next: (res) => {
          console.log('Updated Book:', { id: this.currentBookId(), ...bookData });
        }
      });
      
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {     
      const subscription = this.bookService.postCreateBook(book).subscribe({
        next: (res) => {
          console.log('New Book Created:', bookData);
        }
      });
      
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }

    this.router.navigate(['/books']);
  }
}
