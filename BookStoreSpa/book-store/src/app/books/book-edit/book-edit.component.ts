import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';

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

  bookForm: FormGroup;
  isEditMode = signal(false);
  currentBookId = signal<number | null>(null);

  constructor() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });

    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.isEditMode.set(true);
      this.currentBookId.set(+bookId);
      this.bookService.getBookById(bookId);
    }
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const bookData = this.bookForm.value;

    if (this.isEditMode()) {
      console.log('Updated Book:', { id: this.currentBookId(), ...bookData });
      // Update logic here
    } else {
      console.log('New Book Created:', bookData);
      // Create logic here
    }

    this.router.navigate(['/']);
  }
}
