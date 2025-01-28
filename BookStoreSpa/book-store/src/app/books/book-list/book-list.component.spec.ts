import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { DestroyRef } from '@angular/core';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockService: jasmine.SpyObj<BooksService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivateRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockDestroyRef: jasmine.SpyObj<DestroyRef>;
  let book: Book;

  beforeEach(async () => {
    // Create a mock service
    mockService = jasmine.createSpyObj<BooksService>('BooksService', ['getAllBooks']);
    book = { id : 'id', title : "title", author : "author", imgUrl: "imgUrl", description: "description", isbn : "isbn", publishedDate: ""};
    mockService.getAllBooks.and.returnValue(of([book]));
    mockService.deleteRemoveBook.and.returnValue(of(true));
    mockService.getBookById.and.returnValue(of(book));

    // Create a mock Router
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    // Create a mock ActivatedRoute
    mockActivateRoute = jasmine.createSpyObj<ActivatedRoute>('ActivateRoute', ['navigate']);

    // Create a mock DestroyRef
    mockDestroyRef = jasmine.createSpyObj<DestroyRef>('DestroyRef', ['onDestroy']);

    await TestBed.configureTestingModule({
      imports: [BookListComponent, DatePipe, RouterModule],
      providers: [
        {provide: BooksService, useValue: mockService},
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: mockActivateRoute},
        {provide: DestroyRef, useValue: mockDestroyRef}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the books after the async call', fakeAsync(() => {
    const fixture = TestBed.createComponent(BookListComponent);
    fixture.detectChanges();  // Triggers change detection

    // Simulate the async passage of time
    tick();  // Advances the virtual clock and triggers the observable subscription

    // Now check if the signal was updated
    const component = fixture.componentInstance;
    expect(component.books()).toBe([book]);
  }));
});
