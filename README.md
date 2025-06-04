General structure

The repository contains a .NET solution under BookStore and an Angular frontend under BookStoreSpa/book-store.

.NET projects:

BookStore.WebApi – ASP.NET Core API exposing book endpoints via BooksController

BookStore.DataAccess – EF Core DbContext, repository implementations, MediatR request handlers, and a Unit of Work layer

BookStore.Model – domain entities (e.g., Book) and interfaces

BookStore.Core – DTOs used across layers

BookStore.Tests – xUnit tests for handlers and repository.

BookStoreSpa/book-store is an Angular 19 SPA with standalone components and routing.

Service BooksService communicates with the API via HTTP

Routes are defined in app.routes.ts

Components: BookListComponent lists books, BookEditComponent handles create/update forms

Important points

Project references: Each .NET project references others as shown in the solution (BookStore.sln). Core functionality and models are shared across projects via project references.

MediatR pattern: Request handlers in HandlerRequests encapsulate logic for each operation. BooksController uses IMediator to send these requests.

Entity Framework: BookDbContext defines a DbSet<Book>. Migration files exist under Migrations for database schema evolution.

Unit tests: Backend tests use Moq, xUnit, and FluentAssertions (see BookStore.Tests.csproj). Angular tests use Jasmine/Karma.

Angular application: The SPA is bootstrapped via main.ts and uses standalone Angular components. HTTP endpoints assume the Web API runs on https://localhost:7162/.

Getting started / next steps

Build and run the API (dotnet build / dotnet run in BookStore.WebApi).

Build and run the Angular app (cd BookStoreSpa/book-store && npm install && ng serve).

Explore how MediatR handlers tie together repository actions and controller routes.

Examine unit tests in BookStore.Tests and Angular component tests for usage examples.

Learn Entity Framework migrations for database changes and how the Angular service interacts with the backend.

This provides a baseline understanding of how the backend API and frontend SPA work together within the repository. The solution’s layered structure (Core, Domain, DataAccess, WebApi, Tests) along with the Angular client offers a good foundation for further exploration and development.

License

This project is licensed under the MIT License - see the LICENSE file for details.
