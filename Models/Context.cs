using System;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Models
{
    public class Context: DbContext
    {
        public Context(DbContextOptions options) : base(options) { }
        public DbSet<User> Users {get; set;}
        public DbSet<Bug> Bugs {get; set;}
        public DbSet<Comment> Comments {get; set;}
        public DbSet<Project> Projects {get; set;}
        public DbSet<Assign> Assigned {get; set;}        
        public DbSet<Contributor> Contributors {get; set;}
    }
    
}