using System;


namespace SupportAPI.Models.Entities
{
    public partial class Notes
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime? NoteTimeStamp { get; set; }
        public DateTime? CreationDate { get; set; }
        public string CreationUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public int? IdSupporter { get; set; }
        public int? IdSupervisor { get; set; }
        public int? IdIssue { get; set; }

        public virtual Issue IdIssueNavigation { get; set; }
        public virtual Supervisor IdSupervisorNavigation { get; set; }
        public virtual Supporter IdSupporterNavigation { get; set; }
    }
}
