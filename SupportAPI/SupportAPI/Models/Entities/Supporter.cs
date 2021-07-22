using System;
using System.Collections.Generic;


namespace SupportAPI.Models.Entities
{
    public partial class Supporter
    {
        public Supporter()
        {
            Notes = new HashSet<Notes>();
            SupporterService = new HashSet<SupporterService>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstSurName { get; set; }
        public string SecondSurName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? CreationDate { get; set; }
        public string CreationUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }

        public virtual ICollection<Notes> Notes { get; set; }
        public virtual ICollection<SupporterService> SupporterService { get; set; }
    }
}
