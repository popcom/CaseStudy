using BookStore.Core.DTOs;
using BookStore.Domain.Interfaces;
using MediatR;

namespace BookStore.DataAccess.HandlerRequests;

public class UpdateBookHandler(IBookRepository bookRepository, IUnitOfWork unitOfWork) : IRequestHandler<UpdateBookRequest, bool>
{
    private readonly IBookRepository _bookRepository = bookRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<bool> Handle(UpdateBookRequest request, CancellationToken cancellationToken)
    {
        await _bookRepository.UpdateBookAsync(request.bookId, request.bookDto).ConfigureAwait(false);
        _unitOfWork.SaveChanges();
        return true;
    }
}

public record UpdateBookRequest(Guid bookId, CreateBookDto bookDto) : IRequest<bool>;
