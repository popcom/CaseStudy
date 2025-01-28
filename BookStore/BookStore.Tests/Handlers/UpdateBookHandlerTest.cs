using BookStore.Core.DTOs;
using BookStore.DataAccess.HandlerRequests;
using BookStore.Domain.Interfaces;
using Moq;

namespace BookStore.Tests.Handlers;

public class UpdateBookHandlerTest
{
    private readonly Mock<IBookRepository> _repositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly UpdateBookHandler _handler;

    public UpdateBookHandlerTest()
    {
        _repositoryMock = new Mock<IBookRepository>();
        _unitOfWork = new Mock<IUnitOfWork>();
        _handler = new UpdateBookHandler(_repositoryMock.Object, _unitOfWork.Object);
    }

    [Fact]
    public async Task Handle_CreateBook()
    {
        // Arrange
        var entityId = Guid.NewGuid();
        var bookDto = new CreateBookDto { Title = "TestTitle", Author="TestAuthor", Description = "TestAuthor" };
        _repositoryMock.Setup(r => r.UpdateBookAsync(entityId, bookDto));

        var request = new UpdateBookRequest(entityId, bookDto);

        // Act
        var result = await _handler.Handle(request, CancellationToken.None);

        // Assert
        _repositoryMock.Verify(r => r.UpdateBookAsync(entityId, bookDto), Times.Once);
        _unitOfWork.Verify(r => r.SaveChanges(), Times.Once);
    }
}
