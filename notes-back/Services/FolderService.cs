using System.Threading.Tasks;
using notes_back.Data;
using notes_back.Models;
using Microsoft.EntityFrameworkCore;

namespace notes_back.Services
{
    public class FolderService
    {
        private readonly ApplicationDbContext _context;

        public FolderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Folder> CreateFolderAsync(Folder folder)
        {
            _context.Folders.Add(folder);
            await _context.SaveChangesAsync();
            return folder;
        }

        public async Task<Folder> GetFolderByIdAsync(int id)
        {
            return await _context.Folders.FindAsync(id);
        }

        public async Task<Folder> UpdateFolderNameAsync(int id, string newFolderName)
        {
             var folder = await _context.Folders.FirstOrDefaultAsync(f => f.Id == id);

             if (folder == null)
            {
                return null;
            }

            folder.Name = newFolderName;
            await _context.SaveChangesAsync();

            return folder;

        }

        public async Task<List<Folder>> GetAllFoldersByUserAsync(int id)
        {
            return await _context.Folders.Where(f => f.UserId == id).ToListAsync();
        }

        public async Task<bool> DeleteFolderByIdAsync(int id)
        {
             var folder = await _context.Folders.FindAsync(id);

            if (folder == null)
            {
                return false;
            }

            _context.Folders.Remove(folder);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}