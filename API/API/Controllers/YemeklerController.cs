using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class YemeklerController : Controller
  {
    private readonly YemekDbContext _yemekDbContext;

    public YemeklerController(YemekDbContext yemekDbContext)
    {
      _yemekDbContext = yemekDbContext;
    }


    [HttpGet]
    public async Task<IActionResult> GetAllYemekler()
    {
      var yemekler = await _yemekDbContext.Yemekler.ToListAsync();
      return Ok(yemekler);
    }


    [HttpPost]
    public async Task<IActionResult> AddYemek([FromBody] Yemek yemekRequest)
    {

      
      
      

      await _yemekDbContext.Yemekler.AddAsync(yemekRequest);
      await _yemekDbContext.SaveChangesAsync();

      return Ok(yemekRequest);

    }

    [HttpPut]
    public async Task<IActionResult> UpdateYemek([FromBody] Yemek updateYemekRequest)
    {


      var existingYemek = await _yemekDbContext.Yemekler.FindAsync(updateYemekRequest.id);

      if (existingYemek != null)
      {
        // Update the existing Yemek with the new values
        // Replace Property1 with the actual property names
        existingYemek.isim = updateYemekRequest.isim;
        existingYemek.aciklama = updateYemekRequest.aciklama;
        existingYemek.kategori = updateYemekRequest.kategori;
        existingYemek.resimPath = updateYemekRequest.resimPath;
        existingYemek.fiyat = updateYemekRequest.fiyat;
        // Update other properties as needed

        // Save the changes to the database
        await _yemekDbContext.SaveChangesAsync();
        return Ok(existingYemek);
      }
      else
      {
        // If the Yemek does not exist, add it to the database
        return NotFound("Not F");

      }
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteYemek([FromRoute] String id)
    {
      var yemek = await _yemekDbContext.Yemekler.FindAsync(id);

      if (yemek == null)
      {
        return NotFound("Not F");
      }

      _yemekDbContext.Yemekler.Remove(yemek);
      await _yemekDbContext.SaveChangesAsync();
      return Ok(yemek);
    }
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetYemek([FromRoute] String id)
    {
      int yemekId = Int32.Parse(id);
      var yemek = await _yemekDbContext.Yemekler.FindAsync(yemekId);

      if (yemek == null)
      {
        return NotFound("Not F");
      }

      
      return Ok(yemek);
    }
   



  }
}
