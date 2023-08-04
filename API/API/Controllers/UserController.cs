using API.Data;
using API.Helpers;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using API.Models.Dto;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : Controller
  {
    private readonly YemekDbContext _authContext;
    public UserController(YemekDbContext yemekDbContext)
    {
      _authContext = yemekDbContext;

    }

    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] User userObj)
    {
      if (userObj == null)
      {
        return BadRequest();
      }
      var user = await _authContext.Users.FirstOrDefaultAsync(x => x.email == userObj.email);
      if (user == null)
      {
        return NotFound(new {Message ="User Not Found!"});
      }
      if (!PasswordHasher.VerifyPassword(userObj.password, user.password))
      {
        return BadRequest(new {Message = "Password is incorrect"});
      }

      user.token = CreateJwt(user);
      var newAccessToken = user.token;
      var newRefreshToken = CreateRefreshToken();
      user.refreshToken = newRefreshToken;
      user.refreshTokenExpiryTime = DateTime.UtcNow.AddDays(5);
      await _authContext.SaveChangesAsync();

      return Ok(new TokenApiDto()
      {
        accessToken = newAccessToken,
        refreshToken = newRefreshToken
        
      });
    }




    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] User userObj)
    {
      if(userObj == null)
         return BadRequest();
      if (await CheckEmailExistAsync(userObj.email))
        return BadRequest(new { Message = "Email already exists!" });

      userObj.password = PasswordHasher.HashPassword(userObj.password);
      userObj.role = "User";
      userObj.token = "";
      await _authContext.Users.AddAsync(userObj);
      await _authContext.SaveChangesAsync();
      return Ok(new
      {
        Message = "User Registered"
      });

    }
    private Task<bool> CheckEmailExistAsync(string email)
      => _authContext.Users.AnyAsync(x => x.email == email);


    
    private string CreateJwt(User user)
    {
      var jwtTokenHandler = new JwtSecurityTokenHandler();
      var key = System.Text.Encoding.ASCII.GetBytes("verysecret but apperently not sectet enough");
      var identity = new ClaimsIdentity(new Claim[]
      {
        new Claim(ClaimTypes.NameIdentifier,user.id.ToString()),
        new Claim(ClaimTypes.Role, user.role),
        new Claim(ClaimTypes.Email, $"{user.email }")
      });
      var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = identity,
        Expires = DateTime.Now.AddDays(5),
        SigningCredentials = credentials
      };
      var token = jwtTokenHandler.CreateToken(tokenDescriptor);
      return jwtTokenHandler.WriteToken(token);
    }

    private string CreateRefreshToken()
    {
      var tokenBytes = RandomNumberGenerator.GetBytes(64);
      var refreshToken = Convert.ToBase64String(tokenBytes);

      var tokenInUser = _authContext.Users
        .Any(a => a.refreshToken == refreshToken);
      if (tokenInUser)
      {
        return CreateRefreshToken();
      }
      return refreshToken;
    }

    private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
    {
      var key = Encoding.ASCII.GetBytes("verysecret but apperently not sectet enough");
      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidateAudience = false,
        ValidateIssuer = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateLifetime = false
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      SecurityToken securityToken;
      var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
      var jwtSecurityToken = securityToken as JwtSecurityToken;
      if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        throw new SecurityTokenException("This is Invalid Token");
      return principal;
    }







    [HttpPost("ID")]
    
    public async Task<ActionResult<int>> GetUserId([FromBody]string email)
    {
      var user = await _authContext.Users.FirstOrDefaultAsync(u => u.email == email);
      if (user == null)
        return NotFound("bulunamadı");
      return Ok(user.id);
    }
    [HttpPost("email")]

    public async Task<ActionResult> GetEmail([FromBody] int id)
    {
      var user = await _authContext.Users.FindAsync(id);
      if (user == null)
        return NotFound("bulunamadı");
      Console.Write(user.email);
      return Ok(user.email);
      
    }

    [HttpPost("refresh")]

    public async Task<IActionResult> Refresh(TokenApiDto tokenApiDto)
    {
      if (tokenApiDto is null)
        return BadRequest("Invalid Client Request");
      string accessToken = tokenApiDto.accessToken;
      string refreshToken = tokenApiDto.refreshToken;
      var principal = GetPrincipleFromExpiredToken(accessToken);
      var email = principal.FindFirst(ClaimTypes.Email).Value;
      var user = await _authContext.Users.FirstOrDefaultAsync(u => u.email == email);
      if (user is null || user.refreshToken != refreshToken || user.refreshTokenExpiryTime <= DateTime.Now)
        return BadRequest("Invalid Request");
      var newAccessToken = CreateJwt(user);
      var newRefreshToken = CreateRefreshToken();
      user.refreshToken = newRefreshToken;
      await _authContext.SaveChangesAsync();
      return Ok(new TokenApiDto()
      {
        accessToken = newAccessToken,
        refreshToken = newRefreshToken,
      });  
    }

    
  }
}
