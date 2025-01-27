using BookStore.Core.DTOs;
using BookStore.Domain.Entities;
using BookStore.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.DataAccess.HandlerRequests
{
    public class GetAllBooksHandler(IBookRepository bookRepository) : IRequestHandler<GetAllBooksRequest, IEnumerable<BookDto>>
    {
        private readonly IBookRepository _bookRepository = bookRepository;

        public async Task<IEnumerable<BookDto>> Handle(GetAllBooksRequest request, CancellationToken cancellationToken)
        {
            var query = await _bookRepository.GetAllBooksAsync().ConfigureAwait(false);
            return await query.Select(p => new BookDto
            {
                Id = p.Id,
                Description = p.Description,
                ImgUrl = p.ImgUrl,
                Author = p.Author,
                Title = p.Title,
                ISBN = p.ISBN,
                PublishedDate = p.PublishedDate,
            }).ToListAsync().ConfigureAwait(false);
        }
    }

    public record GetAllBooksRequest() : IRequest<IEnumerable<BookDto>>;
}
