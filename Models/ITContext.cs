using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class ITContext : DbContext
    {
        public DbSet<Firm> Firms { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public ITContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Task>(b=>{
                b.HasKey( t=>t.ID);
                b.Property(t=>t.ID).ValueGeneratedOnAdd();
            });
        }
    }
}