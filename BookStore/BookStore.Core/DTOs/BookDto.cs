namespace BookStore.Core.DTOs;

public class BookDto: CreateBookDto
{
    public Guid? Id { get; set; } = null;
}
