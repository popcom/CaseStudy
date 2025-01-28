using BookStore.Core.DTOs;
using BookStore.DataAccess;
using BookStore.DataAccess.Repositories;
using BookStore.Domain.Entities;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Tests.Repositories;

public class BookRepositoryTest
{
    private readonly BookDbContext _context;
    private readonly BookRepository _repository;

    public BookRepositoryTest()
    {
        var options = new DbContextOptionsBuilder<BookDbContext>()
            .UseInMemoryDatabase("TestDb")
            .Options;
        _context = new BookDbContext(options);
        _repository = new BookRepository(_context);
    }

    [Fact]
    public async Task AddBookAsync_AddsBooksToDatabase()
    {
        // Arrange
        var entityId = Guid.NewGuid();
        var bookDto = new CreateBookDto { Title = "TestTitle", Author = "TestAuthor", Description = "TestAuthor" };

        var book = new Book()
        {
            Id = entityId,
            Title = bookDto.Title,
            Author = bookDto.Author,
            Description = bookDto.Description,
        };


        // Act
        await _repository.AddBookAsync(bookDto);
        await _context.SaveChangesAsync();

        // Assert
        _context.Books!.Count().Should().Be(1);
        _context.Books!.First().Title.Should().Be("TestTitle");
    }

    [Fact]
    public async Task GetBookByIdAsync_ReturnsBookByIdFromDatabase()
    {
        // Arrange
        var bookDto = new CreateBookDto { Title = "TestTitle", Author = "TestAuthor", Description = "TestAuthor" };
        var entityId = await _repository.AddBookAsync(bookDto);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetBookByIdAsync(entityId);

        // Assert
        result!.Should().NotBeNull();
        result!.Title.Should().Be("TestTitle");
    }

    [Fact]
    public async Task DeleteBookByIdAsync_RemovesBookFromDatabase()
    {
        // Arrange
        var bookDto = new CreateBookDto { Title = "TestTitle", Author = "TestAuthor", Description = "TestAuthor" };
        var entityId = await _repository.AddBookAsync(bookDto);
        await _context.SaveChangesAsync();

        // Act
        await _repository.DeleteBookAsync(entityId);
        await _context.SaveChangesAsync();

        // Assert
        var result = await _repository.GetBookByIdAsync(entityId);
        result!.Should().BeNull();
    }

    [Fact]
    public async Task UpdateBookAsync_UpdatesBookOnDatabase()
    {
        // Arrange
        var bookDto = new CreateBookDto { Title = "TestTitle", Author = "TestAuthor", Description = "TestAuthor" };
        var entityId = await _repository.AddBookAsync(bookDto);
        await _context.SaveChangesAsync();


        // Act
        bookDto.Title = "New TestTitle";
        await _repository.UpdateBookAsync(entityId, bookDto);
        await _context.SaveChangesAsync();

        // Assert
        var result = await _repository.GetBookByIdAsync(entityId);
        result.Should().NotBeNull();
        result.Title.Should().Be("New TestTitle");
    }

    [Fact]
    public async Task GetAllBooks_ReturnsBooksFromDatabaseAsQueryable()
    {
        // Arrange
        var bookDto = new CreateBookDto { Title = "TestTitle", Author = "TestAuthor", Description = "TestAuthor" };
        var entityId = await _repository.AddBookAsync(bookDto);
        await _context.SaveChangesAsync();


        // Act
        var result = _repository.GetAllBooksQuery();

        // Assert
        result.Should().NotBeNull();
        result.Count().Should().BeGreaterThan(0);
    }
}
