using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly DocumentContext _context;

        public DocumentController(DocumentContext context)
        {
            _context = context;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            using var sha256 = SHA256.Create();
            using var stream = file.OpenReadStream();
            byte[] hashBytes = await sha256.ComputeHashAsync(stream);
            string hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();

            // Check if hash already exists in DB
            var existingDoc = await _context.Documents.FirstOrDefaultAsync(d => d.Hash == hashString);
            if (existingDoc != null)
            {
                return Ok(new { message = "Document hash already exists in the system.", hash = hashString, exists = true });
            }

            var doc = new DocumentMetadata
            {
                FileName = file.FileName,
                Hash = hashString,
                UploadTime = DateTime.UtcNow
            };

            _context.Documents.Add(doc);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Document hash generated successfully.", hash = hashString, exists = false });
        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            using var sha256 = SHA256.Create();
            using var stream = file.OpenReadStream();
            byte[] hashBytes = await sha256.ComputeHashAsync(stream);
            string hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();

            var record = await _context.Documents.FirstOrDefaultAsync(d => d.Hash == hashString);

            if (record != null)
            {
                return Ok(new { verified = true, hash = hashString, metadata = record });
            }

            return Ok(new { verified = false, hash = hashString });
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var docs = await _context.Documents.OrderByDescending(d => d.UploadTime).ToListAsync();
            return Ok(docs);
        }
    }
}
