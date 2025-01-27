using BookStore.Core.DTOs;
using BookStore.Domain.Entities;
using BookStore.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.DataAccess.Repositories
{
    public class BookRepository(BookDbContext bookDbContext) : IBookRepository
    {
        private readonly BookDbContext _bookDbContext = bookDbContext;

        public async Task<Guid> AddBookAsync(BookDto book)
        {
            Book newBook = new()
            {
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                ImgUrl = book.ImgUrl,
                ISBN = book.ISBN,
                PublishedDate = book.PublishedDate,
            };
            var result = _bookDbContext.Books!.Add(newBook);
            //_bookDbContext.SaveChanges();
            return result.Entity.Id;
        }

        public Task DeleteBookAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IQueryable<Book>> GetAllBooksAsync()
        {
            await Task.Yield();
            return _bookDbContext.Books!;
        }

        public async Task<Book?> GetBookByIdAsync(Guid id)
        {
            return await _bookDbContext.Books!.FirstOrDefaultAsync(p => p.Id == id).ConfigureAwait(false);
        }

        public Task UpdateBookAsync(Book book)
        {
            throw new NotImplementedException();
        }
    }
}
