using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public enum SeniorityLevel : int
    {
        Junior = 1,
        Medior = 2,
        Senior = 3
    }

    public class Employee
    {
        [Key]
        public int ID { get; set; }

        [Required(ErrorMessage = "Please enter JMBG of employee.")]
        [Range(1000000000000, 9999999999999)] //13
        public string JMBG { get; set; }

        [Required(ErrorMessage = "Please enter name of employee.")]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter surname of employee.")]
        [MaxLength(50)]
        public string Surname { get; set; }

        [MaxLength(50)]
        public string JobTitle { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public SeniorityLevel Seniority { get; set; }

        [ForeignKey("Firm")]
        public int FirmID { get; set; }

        [JsonIgnore]
        public virtual Firm Firm { get; set; }
    }
}