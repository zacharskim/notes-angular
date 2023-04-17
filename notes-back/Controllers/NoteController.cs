using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using notes_back.Models;
using notes_back.Services;



namespace notes_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NoteService _noteService;
        public NotesController(NoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateNoteAsync([FromBody] Note note)
        {
            if (note == null || string.IsNullOrEmpty(note.Title))
            {
                return BadRequest("Invalid note data");
            }

            var createdNote = await _noteService.AddNote(note);
            return CreatedAtAction(nameof(GetNoteById), new { id = createdNote.Id }, createdNote);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNoteById(int id)
        {
            var note = await _noteService.GetNoteByIdAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }
        [HttpGet("user/{id}")]
        public async Task<ActionResult<List<Note>>> GetAllNotesByUser(int id)
        {
            var notes = await _noteService.GetAllNotesByUserAsync(id);

            if (notes == null)
            {
                return NotFound();
            }

            return notes;
        }

        [HttpPut("move/{noteId}/{folderId}")]
        public async Task<IActionResult> MoveNoteToFolder(int noteId, int folderId)
        {
            await _noteService.MoveNoteToFolderAsync(noteId, folderId);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNoteById(int id)
        {
            var note = await _noteService.GetNoteByIdAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            await _noteService.DeleteNoteByIdAsync(id);
            return NoContent();
        }

        [HttpPut("title/{id}")]
        public async Task<IActionResult> UpdateNoteTitle(int id, [FromBody] string newTitle)
        {
            await _noteService.UpdateNoteTitleAsync(id, newTitle);
            return NoContent();
        }

        [HttpPut("content/{id}")]
        public async Task<IActionResult> UpdateNoteContent(int id, string newContent)
        {
            var note = await _noteService.UpdateNoteContentAsync(id, newContent);
            return Ok(note);
        }



    }
}