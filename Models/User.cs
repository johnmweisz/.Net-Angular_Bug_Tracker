using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BugTracker.Models
{
    public class User
    {
        [Key]
        public int UserId {get;set;}
        [Required]
        [Display(Name = "First Name")]
        public string FirstName {get;set;}
        [Required]
        [Display(Name = "Last Name")]
        public string LastName {get;set;}
        [Required]
        [EmailAddress]
        public string Email {get;set;}
        [JsonIgnore]
        [Required]
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$", ErrorMessage="Minimum eight characters, at least one letter, one number, and one special character.")]
        [DataType(DataType.Password)]
        public string Password {get;set;}
        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public DateTime UpdatedAt {get;set;} = DateTime.Now;
        // Not Mapped
        [JsonIgnore]
        [NotMapped]
        [Compare("Password")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        public string Confirm {get;set;}
        // Link & Navigation
        public ICollection<Assign> Assigned {get;set;}
        public ICollection<Bug> Created {get;set;}
        public ICollection<Comment> Comments {get;set;}
    }
}