using System;
using System.ComponentModel.DataAnnotations;

namespace notes_back.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public int FolderId { get; set; }
        public int UserId { get; set; }

    }
}
