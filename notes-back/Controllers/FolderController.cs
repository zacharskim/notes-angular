using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using notes_back.Models;
using notes_back.Services;


namespace notes_back.Controllers
{
     [ApiController]
    [Route("api/[controller]")]
    public class FoldersController : ControllerBase
    {
        private readonly FolderService _folderService;
        public FoldersController(FolderService folderService)
        {
            _folderService = folderService;
        }

        //controller to create a folder, update folder name, delete folder 

        [HttpPost]
        public async Task<IActionResult> CreateFolder([FromBody] Folder folder)
        {
            if (folder == null || string.IsNullOrEmpty(folder.Name))
            {
                return BadRequest("Invalid folder data");
            }

            var createdFolder = await _folderService.CreateFolderAsync(folder);
            return CreatedAtAction(nameof(GetFolderById), new { id = createdFolder.Id }, createdFolder);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Folder>> GetFolderById(int id)
        {
            var folder = await _folderService.GetFolderByIdAsync(id);

            if (folder == null)
            {
                return NotFound();
            }

            return folder;
        }


        [HttpGet("folder/{uid}")]
        public async Task<ActionResult<List<Folder>>> GetAllFoldersByUser(int uid)
        {
            var folders = await _folderService.GetAllFoldersByUserAsync(uid);

            if (folders == null)
            {
                return NotFound();
            }

            return folders;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFolderName(int id, string newName)
        {
            var folder = await _folderService.GetFolderByIdAsync(id);

            if (newName == null || string.IsNullOrEmpty(folder.Name))
            {
                return BadRequest("Invalid folder data");
            }

            await _folderService.UpdateFolderNameAsync(id, newName);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFolder(int id)
        {
            await _folderService.DeleteFolderByIdAsync(id);
            return NoContent();
        }

    }

}