using BookStore.DataAccess.HandlerRequests;
using BookStore.Domain.Interfaces;
using FluentAssertions;
using Moq;

namespace BookStore.Tests.Handlers;

public class DeleteBookHandlerTest
{
    private readonly Mock<IBookRepository> _repositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly DeleteBookHandler _handler;

    public DeleteBookHandlerTest()
    {
        _repositoryMock = new Mock<IBookRepository>();
        _unitOfWork = new Mock<IUnitOfWork>();
        _handler = new DeleteBookHandler(_repositoryMock.Object, _unitOfWork.Object);
    }

    [Fact]
    public async Task Handle_DeleteBook()
    {
        // Arrange
        var entityId = Guid.NewGuid();
        _repositoryMock.Setup(r => r.DeleteBookAsync(entityId));

        var request = new DeleteBookRequest(entityId);

        // Act
        var result = await _handler.Handle(request, CancellationToken.None);

        // Assert

        result.Should().BeTrue();

        _repositoryMock.Verify(r => r.DeleteBookAsync(entityId), Times.Once);
        _unitOfWork.Verify(r => r.SaveChanges(), Times.Once);
    }
}
