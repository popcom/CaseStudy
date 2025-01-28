using BookStore.Core.DTOs;
using BookStore.Domain.Interfaces;
using MediatR;

namespace BookStore.DataAccess.HandlerRequests;

public class GetBookByIdHandler(IBookRepository bookRepository) : IRequestHandler<GetBookByIdRequest, BookDto?>
{
    private readonly IBookRepository _bookRepository = bookRepository;

    public async Task<BookDto?> Handle(GetBookByIdRequest request, CancellationToken cancellationToken)
    {
        var res = await _bookRepository.GetBookByIdAsync(request.Id).ConfigureAwait(false);
        if(res == null)
        {
            return null;
        }
        return new BookDto
        {
            Id = res.Id,
            Description = res.Description,
            ImgUrl = res.ImgUrl,
            Author = res.Author,
            Title = res.Title,
            ISBN = res.ISBN,
            PublishedDate = res.PublishedDate,
        };
    }
}

public record GetBookByIdRequest(Guid Id) : IRequest<BookDto>;
