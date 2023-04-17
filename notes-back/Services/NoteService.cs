using System.Threading.Tasks;
using notes_back.Data;
using notes_back.Models;
using Microsoft.EntityFrameworkCore;


namespace notes_back.Services
{
    public class NoteService
    {
        private readonly ApplicationDbContext _context;

        public NoteService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Note> AddNote(Note note)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
            return note;
        }

        public async Task<Note> GetNoteByIdAsync(int id)
        {
            return await _context.Notes.FindAsync(id);
        }

        public async Task<List<Note>> GetAllNotesByUserAsync(int id)
        {
            return await _context.Notes.Where(n => n.UserId == id).ToListAsync();
        }

        public async Task MoveNoteToFolderAsync(int noteId, int folderId)
        {
            var note = await _context.Notes.FindAsync(noteId);

            note.FolderId = folderId;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateNoteTitleAsync(int id, string newTitle)
        {
            var note = await _context.Notes.FindAsync(id);

            note.Title = newTitle;
            await _context.SaveChangesAsync();
        }


        public async Task<Note> UpdateNoteContentAsync(int id, string newContent)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);

            if (note == null)
            {
                return null;
            }

            
            note.Content = newContent;
            note.Updated = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return note;
        }

        public async Task<bool> DeleteNoteByIdAsync(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return false;
            }

            _context.Notes.Remove(note);

            await _context.SaveChangesAsync();

            return true;
            
        }

    }
}
