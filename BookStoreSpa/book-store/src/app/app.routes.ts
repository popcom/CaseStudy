import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';

export const routes: Routes = [
    { path: 'books', component: BookListComponent },
    { path: 'edit/:id', component: BookEditComponent },
    { path: 'create', component: BookEditComponent },
    // { path: '', redirectTo: '/books', pathMatch: 'full' },
  ];
