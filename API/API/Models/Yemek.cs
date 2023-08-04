using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
  public class Yemek
  {

    [Key]
    public int id { get; set; }

    public string isim { get; set; }
    public string aciklama { get; set; }
    public string resimPath{ get; set; }
    public int fiyat { get; set; }
    [JsonIgnore]
    public Kategori kategori { get; set; }
    public int kategoriId { get; set; }

    
    public List<Siparis> siparisler { get; set; } 

  }
}
