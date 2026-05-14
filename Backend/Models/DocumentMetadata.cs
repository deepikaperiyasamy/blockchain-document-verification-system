using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class DocumentMetadata
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string FileName { get; set; } = string.Empty;
        
        [Required]
        public string Hash { get; set; } = string.Empty;
        
        public DateTime UploadTime { get; set; } = DateTime.UtcNow;
    }
}
