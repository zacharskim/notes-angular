using System.ComponentModel.DataAnnotations;

namespace notes_back.Models
{
    public class Folder
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }

    }
}
