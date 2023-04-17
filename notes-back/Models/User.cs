using System.ComponentModel.DataAnnotations;

namespace notes_back.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
    }
}
