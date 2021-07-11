using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace SupportAPI.Models.Entities
{
    public partial class SupporterService
    {
        public int Id { get; set; }
        public int? IdSupporter { get; set; }
        public int? IdService { get; set; }

        public virtual Service IdServiceNavigation { get; set; }
        public virtual Supporter IdSupporterNavigation { get; set; }
    }
}
