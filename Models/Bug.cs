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
        public string Status {get;set;} = "New";
        [Required]
        [CheckFuture(1)]
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
        public ICollection<Update> Updates {get;set;}
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
            if(DateTime.Now.Date.AddDays(_days).AddTicks(-1) > (DateTime) value)
            {
                return new ValidationResult($"You must set a due date at least {_days} day(s) in the future.");
            }
            return ValidationResult.Success;
        }
    }

}