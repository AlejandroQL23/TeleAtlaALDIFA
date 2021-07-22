using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace SupportAPI.Models.Entities
{
    public partial class Issue
    {
        public Issue()
        {
            Notes = new HashSet<Notes>();
        }

        public int Id { get; set; }
        public string Reference { get; set; }
        public string Classification { get; set; }
        public string Status { get; set; }
        public DateTime? IssueTimeStamp { get; set; }
        public string ResolutionComment { get; set; }
        public string Description { get; set; }
        public int? IdClient { get; set; }
        public string EmailIssue { get; set; }
        public string PhoneIssue { get; set; }
        public DateTime? CreationDate { get; set; }
        public string CreationUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public int? IdService { get; set; }

        public virtual Service IdServiceNavigation { get; set; }
        public virtual ICollection<Notes> Notes { get; set; }
    }
}
