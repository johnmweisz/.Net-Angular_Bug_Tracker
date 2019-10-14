using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BugTracker.Models
{
    public class Comment
    {
        [Key]
        public int CommentId {get;set;}
        [Required]
        public string Status {get;set;}
        [Required]
        public string Message {get; set;}
        [Required]
        public int BugId {get;set;}
        [Required]
        public int UserId {get;set;}
        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public Bug Bug {get;set;}
        public User User {get;set;}
    }
}