using BookStore.Core.DTOs;
using BookStore.Domain.Entities;
using BookStore.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BookStore.DataAccess.Repositories
{
    public class BookRepository(BookDbContext bookDbContext) : IBookRepository
    {
        private readonly BookDbContext _bookDbContext = bookDbContext;

        public async Task<Guid> AddBookAsync(CreateBookDto bookDto)
        {
            await Task.Yield();
            Book newBook = new()
            {
                Title = bookDto.Title,
                Author = bookDto.Author,
                Description = bookDto.Description,
                ImgUrl = bookDto.ImgUrl,
                ISBN = bookDto.ISBN,
                PublishedDate = bookDto.PublishedDate,
            };
            var result = _bookDbContext.Books!.Add(newBook);
            //_bookDbContext.SaveChanges();
            return result.Entity.Id;
        }

        public async Task DeleteBookAsync(Guid id)
        {
            var book = await _bookDbContext.Books!.FirstOrDefaultAsync(p => p.Id == id).ConfigureAwait(false);
            if (book is null)
            {
                throw new KeyNotFoundException($"Book with id {id} not found.");
            }
            _bookDbContext.Books!.Remove(book);
        }

        public IQueryable<Book> GetAllBooksQuery()
        {
            return _bookDbContext.Books!.AsQueryable();
        }

        public async Task<Book?> GetBookByIdAsync(Guid id)
        {
            return await _bookDbContext.Books!.FirstOrDefaultAsync(p => p.Id == id).ConfigureAwait(false);
        }

        public async Task UpdateBookAsync(Guid id, CreateBookDto bookDto)
        {
            var book = await _bookDbContext.Books!.FirstOrDefaultAsync(p => p.Id == id).ConfigureAwait(false);
            if (book is null)
            {
                throw new KeyNotFoundException($"Book with id {id} not found.");
            }
            book.Title = bookDto.Title;
            book.Author = bookDto.Author;
            book.Description = bookDto.Description;
            book.ISBN = bookDto.ISBN;
            book.ImgUrl = bookDto.ImgUrl;
            book.PublishedDate = bookDto.PublishedDate;
        }
    }
}
