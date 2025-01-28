using BookStore.Core.DTOs;
using BookStore.DataAccess.HandlerRequests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers;

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
    public async Task<IActionResult> AddBook([FromBody] CreateBookDto bookDto)
    {
        var res = await _mediator.Send(new CreateBookRequest(bookDto));
        return Ok(res);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(Guid id, [FromBody] CreateBookDto bookDto)
    {
        var res = await _mediator.Send(new UpdateBookRequest(id, bookDto));
        return Ok(res);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(Guid id)
    {
        var res = await _mediator.Send(new DeleteBookRequest(id));
        return Ok(res);
    }
}
