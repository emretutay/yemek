using API.Helpers;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class YemekDbContext : DbContext
  {
    public YemekDbContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Yemek> Yemekler { get; set; }
    public DbSet<Siparis> Siparisler { get; set; }

    public DbSet<User> Users { get; set; }
    public DbSet<Kategori> Kategoriler { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<User>().HasData(
        new User() { id = 1, email = "admin@admin.com",role = "Admin",password = PasswordHasher.HashPassword("admin1234")});
    }
  }
}
