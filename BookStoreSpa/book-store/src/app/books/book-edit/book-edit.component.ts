import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CreateBook } from '../create-book.model';
import { Store } from '@ngrx/store';
import { loadBook, createBook, updateBook } from '../books.actions';
import { selectCurrentBook } from '../books.selectors';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  bookForm: FormGroup;
  isEditMode = false;
  currentBookId: string | null = null;
  currentBook: CreateBook | null = null;

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
      this.isEditMode = true;
      this.currentBookId = bookId;
      this.store.dispatch(loadBook({ id: bookId }));
      this.store.select(selectCurrentBook).subscribe((book) => {
        if (!book) return;
        if (book.publishedDate) {
          const date = new Date(book.publishedDate);
          (book as any).publishedDate = date.toLocaleDateString('en-CA');
        }
        this.currentBook = book;
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          description: book.description,
          imgUrl: book.imgUrl,
          isbn: book.isbn,
          publishedDate: (book as any).publishedDate,
        });
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
    
    if (this.isEditMode) {
      this.store.dispatch(updateBook({ id: this.currentBookId!, book }));
    } else {
      this.store.dispatch(createBook({ book }));
    }

    this.router.navigate(['/books']);
  }
}
