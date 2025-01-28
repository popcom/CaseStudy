using System.ComponentModel.DataAnnotations;

namespace BookStore.Domain.Entities
{
    public class BaseEntity
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public DateTime Created { get; set; } = DateTime.Now;
    }
}
