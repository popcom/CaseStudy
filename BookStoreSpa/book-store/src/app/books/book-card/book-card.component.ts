import { Component, input, OnInit } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit {
  book = input.required<Book>();

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
