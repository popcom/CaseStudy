using BookStore.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess;

public class BookDbContext(DbContextOptions<BookDbContext> options) : DbContext(options)
{
    public DbSet<Book>? Books { get; set; }
}
