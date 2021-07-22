using System;
using System.Collections.Generic;

namespace SupportAPI.Models.Entities
{
    public partial class Service
    {
        public Service()
        {
            Issue = new HashSet<Issue>();
            SupporterService = new HashSet<SupporterService>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? CreationDate { get; set; }
        public string CreationUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }

        public virtual ICollection<Issue> Issue { get; set; }
        public virtual ICollection<SupporterService> SupporterService { get; set; }
    }
}
