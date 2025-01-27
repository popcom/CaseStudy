using BookStore.Core.DTOs;
using BookStore.DataAccess.HandlerRequests;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace BookStore.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BooksController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAllBooks()
        {
            var result = await _mediator.Send(new GetAllBooksRequest());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(Guid id)
        {
            var book = await _mediator.Send(new GetBookByIdRequest(id));
            return book != null ? Ok(book) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] BookDto bookDto)
        {
            return Ok(_mediator.Send(new CreateBookRequest(bookDto)));
        }
    }
}
