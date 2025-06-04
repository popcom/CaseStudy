import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { BookEditComponent } from './book-edit.component';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  let store: MockStore;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRoute;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockRoute = { snapshot: { paramMap: { get: () => null } } } as any;

    const initialState = { books: { books: [], selectedBook: null, loading: false, error: null } };

    await TestBed.configureTestingModule({
      imports: [BookEditComponent, RouterModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
