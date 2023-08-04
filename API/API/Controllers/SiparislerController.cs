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
  public class SiparislerController : Controller
  {
    private readonly YemekDbContext _yemekDbContext;

    public SiparislerController(YemekDbContext yemekDbContext)
    {
      _yemekDbContext = yemekDbContext;
    }

    [HttpGet]
    [Route("{userId}")]
    public async Task<ActionResult<List<Siparis>>> Get([FromRoute]int userId)
    {
      var user = await _yemekDbContext.Users.FindAsync(userId);
      if (user.role == "Admin") {
        var admin_siparisler = await _yemekDbContext.Siparisler
        .Include(c => c.yemek)
        .ToListAsync();

        return admin_siparisler;
      }
      var siparisler = await _yemekDbContext.Siparisler
        .Where(c => c.userId == userId)
        .Include(c=>c.yemek)
        .ToListAsync();

      return siparisler;
    }

    [HttpPost]
    public async Task<ActionResult<List<Siparis>>> Create(CreateSiparisDto request)
    {
      var user = await _yemekDbContext.Users.FindAsync(request.userId);
      if (user == null)
      {
        return NotFound();
      }

      var yemek = await _yemekDbContext.Yemekler.FindAsync(request.yemekId);
      if (yemek == null)
      {
        return NotFound();
      }
      var newSiparis = new Siparis
      {
        durum = request.durum,
        user = user,
        yemek = yemek

      };
      _yemekDbContext.Siparisler.Add(newSiparis);
      await _yemekDbContext.SaveChangesAsync();

      return await Get(newSiparis.userId);
    }

    [HttpPut]

    public async Task<ActionResult<List<Siparis>>> Update([FromBody] Siparis request)
    {
      

      var user = await _yemekDbContext.Users.FindAsync(request.userId);
      if (user == null)
      {
        return NotFound();
      }

      var yemek = await _yemekDbContext.Yemekler.FindAsync(request.yemekId);
      if (yemek == null)
      {
        return NotFound();
      }
      var siparis = await _yemekDbContext.Siparisler.FindAsync(request.id);
      if (siparis == null)
      {
        return NotFound();
      }

      siparis.durum = request.durum;

      await _yemekDbContext.SaveChangesAsync();
      return await Get(siparis.id);
      

    }
    [HttpPost("delete")]
    public async Task<ActionResult<List<Siparis>>> Delete([FromBody]int siparisId)
    {
      var siparis = await _yemekDbContext.Siparisler.FindAsync(siparisId);
      if (siparis == null)
      {
        return NotFound("bulunamadı");
      }
      _yemekDbContext.Siparisler.Remove(siparis);
      await _yemekDbContext.SaveChangesAsync();
      return await Get(siparis.id);

    }
  }
}
