using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
  public class Siparis
  {
    [Key]
    public int id { get; set; }

    public string durum { get; set; }

    [JsonIgnore]
    public Yemek yemek { get; set; }
    public int yemekId { get; set; }


    public User user { get; set; }
    public int userId { get; set; }



  }
}
