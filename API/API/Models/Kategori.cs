using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
  public class Kategori
  {
    [Key]

    public int id { get; set; }

    public string isim { get; set; }

    [JsonIgnore]
    public List<Yemek> yemekler { get; set; }
  }
}
