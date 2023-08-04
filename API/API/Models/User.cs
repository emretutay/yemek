using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
  public class User
  {
    [Key]
    public int id { get; set; }

    public string password { get; set; }

    public string token { get; set; }
    public string role { get; set; }
    public string email { get; set; }

    public string refreshToken { get; set; }
    public DateTime refreshTokenExpiryTime { get; set; }

    [JsonIgnore]
    public List<Siparis> siparisler { get; set; }

   
  }
}
