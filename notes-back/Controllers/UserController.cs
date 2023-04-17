using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using notes_back.Models;
using notes_back.Services;

namespace notes_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username))
            {
                return BadRequest("Invalid user data");
            }

            var createdUser = await _userService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUserById(string username)
        {
            var user = await _userService.GetUserByIdAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}
