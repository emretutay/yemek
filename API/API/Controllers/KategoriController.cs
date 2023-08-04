using API.Data;
using API.Models;
using API.Models.Dto;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class KategoriController : Controller
  {
    private readonly YemekDbContext _yemekDbContext;

    public KategoriController(YemekDbContext yemekDbContext)
    {
      _yemekDbContext = yemekDbContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Kategori>>> GetKategoriler()
    {
      var kategoriler = await _yemekDbContext.Kategoriler.ToListAsync();
      return Ok(kategoriler);
    }

    [HttpPost("isim")]

    public async Task<ActionResult> GetEmail([FromBody] int id)
    {
      var kategori = await _yemekDbContext.Kategoriler.FindAsync(id);
      if (kategori == null)
        return NotFound("bulunamadı");
      Console.Write(kategori.isim);
      return Ok(kategori.isim);

    }



    [HttpPost]
    public async Task<ActionResult<List<Kategori>>> AddKategori([FromBody]string kategori)
    {
      if (await CheckKategoriExistAsync(kategori))
        return BadRequest(new { Message = "Kategori already exists!" });
      var newKategori = new Kategori
      {
        isim = kategori

      };
      _yemekDbContext.Kategoriler.Add(newKategori);
      await _yemekDbContext.SaveChangesAsync();
      return await GetKategoriler();

    }

    [HttpPut]

    public async Task<ActionResult<List<Kategori>>> UpdateKategori([FromBody] Kategori request)
    {

      var kategori = await _yemekDbContext.Kategoriler.FindAsync(request.id);
      if (kategori == null)
      {
        return NotFound();
      }
      kategori.isim = request.isim;
      await _yemekDbContext.SaveChangesAsync();
      return await GetKategoriler();
    }

    [HttpPost("delete")]
    public async Task<ActionResult<List<Kategori>>> DeleteKategori([FromBody] int id)
    {
      var kategori = await _yemekDbContext.Kategoriler.FindAsync(id);
      if (kategori == null)
      {
        return NotFound("bulunamadı");
      }
      _yemekDbContext.Kategoriler.Remove(kategori);
      await _yemekDbContext.SaveChangesAsync();
      return await GetKategoriler();

    }
  
    private Task<bool> CheckKategoriExistAsync(string kategori)
      => _yemekDbContext.Kategoriler.AnyAsync(x => x.isim == kategori);


  }

}
