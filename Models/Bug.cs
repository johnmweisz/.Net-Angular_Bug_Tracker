using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BugTracker.Models
{
    public class Bug
    {
        [Key]
        public int BugId {get;set;}
        [Required]
        public string Subject {get;set;}
        [Required]
        public string Description {get;set;}
        [Required]
        public string Priority {get;set;}
        [Required]
        public string Status {get;set;}
        [Required]
        [CheckFuture(7)]
        public DateTime DueDate {get;set;}
        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public DateTime UpdatedAt {get;set;} = DateTime.Now;
        // Link & Navigation
        [Required]
        public int UserId {get;set;}
        public User Creator {get;set;}
        [Required]
        public int ProjectId {get;set;}
        public Project Project {get;set;}
        public ICollection<Assign> Assigned {get;set;}
        public ICollection<Comment> Comments {get;set;}
    }

    public class CheckFutureAttribute : ValidationAttribute
    {
        private int _days;
        public CheckFutureAttribute(int days)
        {
            _days = days;
        }
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if(DateTime.Now.AddDays(_days) > (DateTime) value)
            {
                return new ValidationResult($"You must set a due date at least {_days} days in the future.");
            }
            return ValidationResult.Success;
        }
    }

}