using BookStore.Core.DTOs;
using BookStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Domain.Interfaces;

public interface IBookRepository
{
    Task<Book?> GetBookByIdAsync(Guid id);
    Task<IQueryable<Book>> GetAllBooksAsync();
    Task<Guid> AddBookAsync(BookDto book);
    Task UpdateBookAsync(Book book);
    Task DeleteBookAsync(Guid id);
}
