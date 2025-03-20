using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Backend.Models;

namespace MisfitCommunityPlatform.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        // 🟢 SIGNUP (Register New User)
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "Email already exists." });
            }

            var newUser = new User
            {
                Email = request.Email,
                PasswordHash = HashPassword(request.Password), // Secure Hashing
                Role = request.Role ?? "User" // Default to "User" if not provided
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully!" });
        }

        // 🔵 LOGIN (Authenticate User)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var token = GenerateJwtToken(user.Email, user.Role);
            return Ok(new { token, role = user.Role });
        }

        // 🛡️ Generate JWT Token with Role
        private string GenerateJwtToken(string email, string role)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKeyValue = jwtSettings["Secret"] ?? throw new ArgumentNullException("JWT Secret is missing");
            var secretKey = Encoding.UTF8.GetBytes(secretKeyValue);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(secretKey);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.Name, "User"),
                    new Claim(ClaimTypes.Role, role) // Assign Role
                }),
                Expires = DateTime.UtcNow.AddMinutes(60),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = credentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // 🔐 Password Hashing (SHA256)
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }

        // 🔄 Verify Password (Compare Hashes)
        private bool VerifyPassword(string inputPassword, string storedHashedPassword)
        {
            return HashPassword(inputPassword) == storedHashedPassword;
        }
    }

    // 📌 DTOs (Data Transfer Objects)
    public class SignupRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string? Role { get; set; } // Allow optional role assignment
    }

    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
