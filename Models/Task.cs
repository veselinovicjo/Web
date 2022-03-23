using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public enum Priority : int
    {
        Low = 1,
        Medium = 2,
        High = 3
    }

    [Table("Task")]
    public class Task
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(20)]
        public string TaskCode { get; set; }

        [Required(ErrorMessage = "Please enter name of the task.")]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(300)]
        public string Description { get; set; }

        public Priority TaskPriority { get; set; }

        public string Estimation { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeID { get; set; }

        [ForeignKey("Project")]
        public int ProjectID { get; set; }
        
        public virtual Employee Employee { get; set; }
        
        [JsonIgnore]
        public virtual Project Project { get; set; }
    }
}