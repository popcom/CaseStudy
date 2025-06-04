import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let store: MockStore;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create a mock Router
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    const initialState = { books: { books: [], selectedBook: null, loading: false, error: null } };

    await TestBed.configureTestingModule({
      imports: [BookListComponent, DatePipe, RouterModule],
      providers: [
        provideMockStore({ initialState }),
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBooks on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
