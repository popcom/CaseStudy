﻿using System.ComponentModel.DataAnnotations;

namespace BookStore.Domain.Entities;

public class Book : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public required string Title { get; set; }

    [Required]
    [MaxLength(500)]
    public required string Description { get; set; }

    [Required]
    [MaxLength(100)]
    public required string Author { get; set; }

    [MaxLength(100)]
    public string? ImgUrl { get; set; }

    [MaxLength(100)]
    public string? ISBN { get; set; }

    public DateTime? PublishedDate { get; set; }
}
