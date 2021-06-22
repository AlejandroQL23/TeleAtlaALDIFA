using System;
using System.Collections.Generic;

#nullable disable

namespace SupportAPI.Models.Entities
{
    public partial class Note
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime? NoteTimeStamp { get; set; }
        public DateTime? CreationDate { get; set; }
        public string CreationUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    }
}
