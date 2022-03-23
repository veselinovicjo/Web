using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Firm")]
    public class Firm
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [Range(100000000, 999999999)] //9
        public int VATNumber { get; set; }

        [Required]
        [Range(10000000, 99999999)] //8
        public int RegisterNumber { get; set; }

        [Range(1800, 2022)]
        public int YearOfEstablishment { get; set; }

        [RegularExpression("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)", ErrorMessage = "Please enter valid website.")]
        public string Website { get; set; }

        [JsonIgnore]
        public virtual List<Project> Projects { get; set; }

        [JsonIgnore]
        public virtual List<Employee> Employees { get; set; }
    }
}