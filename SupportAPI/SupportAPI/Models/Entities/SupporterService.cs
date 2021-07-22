using System;
using System.Collections.Generic;


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
