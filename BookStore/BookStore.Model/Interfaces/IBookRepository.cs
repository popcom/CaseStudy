using BookStore.Core.DTOs;
using BookStore.Domain.Entities;

namespace BookStore.Domain.Interfaces;

public interface IBookRepository
{
    Task<Book?> GetBookByIdAsync(Guid id);
    IQueryable<Book> GetAllBooksQuery();
    Task<Guid> AddBookAsync(CreateBookDto bookDto);
    Task UpdateBookAsync(Guid id, CreateBookDto bookDto);
    Task DeleteBookAsync(Guid id);
}
