using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BugTracker.Models
{
    public class Update
    {
        [Key]
        public int UpdateId {get;set;}
        [Required]
        public string Status {get;set;}
        [Required]
        public string Message {get; set;}
        public DateTime CreatedAt {get;set;} = DateTime.Now;
        // Link & Navigation
        [Required]
        public int BugId {get;set;}
        public Bug Bug {get;set;}
        [Required]
        public int UserId {get;set;}

        public User User {get;set;}
    }
}