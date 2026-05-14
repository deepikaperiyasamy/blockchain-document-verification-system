using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class DocumentContext : DbContext
    {
        public DocumentContext(DbContextOptions<DocumentContext> options) : base(options) { }

        public DbSet<DocumentMetadata> Documents { get; set; }
    }
}
