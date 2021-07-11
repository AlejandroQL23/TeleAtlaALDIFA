﻿using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace SupportAPI.Models.Entities
{
    public partial class Supporter
    {
        public Supporter()
        {
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

        public virtual ICollection<SupporterService> SupporterService { get; set; }
    }
}
