using BookStore.Core.DTOs;
using BookStore.DataAccess.HandlerRequests;
using BookStore.Domain.Interfaces;
using FluentAssertions;
using Moq;

namespace BookStore.Tests.Handlers;

public class CreateBookHandlerTest
{
    private readonly Mock<IBookRepository> _repositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly CreateBookHandler _handler;

    public CreateBookHandlerTest()
    {
        _repositoryMock = new Mock<IBookRepository>();
        _unitOfWork = new Mock<IUnitOfWork>();
        _handler = new CreateBookHandler(_repositoryMock.Object, _unitOfWork.Object);
    }

    [Fact]
    public async Task Handle_CreateBook()
    {
        // Arrange
        var entityId = Guid.NewGuid();
        var bookDto = new CreateBookDto { Title = "TestTitle", Author="TestAuthor", Description = "TestAuthor" };
        _repositoryMock.Setup(r => r.AddBookAsync(bookDto)).ReturnsAsync(entityId);

        var request = new CreateBookRequest(bookDto);

        // Act
        var result = await _handler.Handle(request, CancellationToken.None);

        // Assert
        result.Should().Be(entityId);
        _repositoryMock.Verify(r => r.AddBookAsync(bookDto), Times.Once);
        _unitOfWork.Verify(r => r.SaveChanges(), Times.Once);
    }
}
