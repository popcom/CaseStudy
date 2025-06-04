import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { booksReducer } from './books/books.reducer';
import { BooksEffects } from './books/books.effects';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'emptyOnly',
      })
    ),
    importProvidersFrom(BrowserModule),
    provideStore({ books: booksReducer, router: routerReducer }),
    provideRouterStore(),
    provideEffects(BooksEffects),
  ]
};
