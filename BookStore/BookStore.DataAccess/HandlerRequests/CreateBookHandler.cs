using BookStore.Core.DTOs;
using BookStore.Domain.Entities;
using BookStore.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.DataAccess.HandlerRequests
{
    public class CreateBookHandler(IBookRepository bookRepository, IUnitOfWork unitOfWork) : IRequestHandler<CreateBookRequest, Guid>
    {
        private readonly IBookRepository _bookRepository = bookRepository;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateBookRequest request, CancellationToken cancellationToken)
        {
            var res = await _bookRepository.AddBookAsync(request.bookDto).ConfigureAwait(false);
            //await _unitOfWork.SaveChangesAsync().ConfigureAwait(false);
            _unitOfWork.SaveChanges();
            return res;
        }
    }

    public record CreateBookRequest(BookDto bookDto) : IRequest<Guid>;
}
