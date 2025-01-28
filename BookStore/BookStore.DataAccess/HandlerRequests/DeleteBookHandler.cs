using BookStore.Domain.Interfaces;
using MediatR;

namespace BookStore.DataAccess.HandlerRequests;

public class DeleteBookHandler(IBookRepository bookRepository, IUnitOfWork unitOfWork) : IRequestHandler<DeleteBookRequest, bool>
{
    private readonly IBookRepository _bookRepository = bookRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<bool> Handle(DeleteBookRequest request, CancellationToken cancellationToken)
    {
        await _bookRepository.DeleteBookAsync(request.bookId).ConfigureAwait(false);
        _unitOfWork.SaveChanges();
        return true;
    }
}

public record DeleteBookRequest(Guid bookId) : IRequest<bool>;
