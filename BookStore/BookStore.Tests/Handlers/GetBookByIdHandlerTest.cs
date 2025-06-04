using BookStore.Core.DTOs;
using BookStore.DataAccess.HandlerRequests;
using BookStore.Domain.Entities;
using BookStore.Domain.Interfaces;
using FluentAssertions;
using Moq;

namespace BookStore.Tests.Handlers;

public class GetBookByIdHandlerTest
{
    private readonly Mock<IBookRepository> _repositoryMock;
    private readonly GetBookByIdHandler _handler;

    public GetBookByIdHandlerTest()
    {
        _repositoryMock = new Mock<IBookRepository>();
        _handler = new GetBookByIdHandler(_repositoryMock.Object);
    }

    [Fact]
    public async Task Handle_GetBookById()
    {
        // Arrange
        var entityId = Guid.NewGuid();
        var bookDto = new CreateBookDto { Title = "TestTitle", Author="TestAuthor", Description = "TestAuthor" };

        var book = new Book()
        {
            Id = entityId,
            Title = bookDto.Title,
            Author = bookDto.Author,
            Description = bookDto.Description,
        };

        _repositoryMock.Setup(r => r.GetBookByIdAsync(entityId)).ReturnsAsync(book);

        var request = new GetBookByIdRequest(entityId);

        // Act
        var result = await _handler.Handle(request, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Title.Should().Be(bookDto.Title);
        result.Id.Should().Be(entityId);
        _repositoryMock.Verify(r => r.GetBookByIdAsync(entityId), Times.Once);
    }
}
