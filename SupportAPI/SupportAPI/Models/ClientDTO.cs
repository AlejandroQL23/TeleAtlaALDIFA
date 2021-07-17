﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SupportAPI.Models
{
    public class ClientDTO
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Firstsurname { get; set; }
        public string Secondsurname { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Secondcontact { get; set; }
        public string Email { get; set; }

        public ClientDTO() { }


    }
}
