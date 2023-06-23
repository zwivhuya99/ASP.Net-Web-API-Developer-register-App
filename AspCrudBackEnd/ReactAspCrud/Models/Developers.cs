//component for primary [key]
using System.ComponentModel.DataAnnotations;
namespace ReactAspCrud.Models
{
    public class Developers
    {
        [Key]
        public int id { get; set; }
        public string devName { get; set; }
        public string software { get; set; }
    }
}
