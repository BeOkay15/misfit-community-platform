using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace MisfitCommunityPlatform.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 🟢 GET All Users (Admin Only)
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            // Debugging: Log JWT Claims
            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();

            // Check if the user has the correct "Admin" role
            var isAdmin = User.IsInRole("Admin");

            if (!isAdmin)
            {
                return Unauthorized(new { message = "Access denied. You are not an Admin.", claims });
            }

            var users = await _context.Users.Select(u => new 
            {
                u.Id,
                u.Email,
                u.Role
            }).ToListAsync();

            return Ok(users);
        }

        // 🔵 GET Current User Profile
        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetUserProfile()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.Email)?.Value;
            if (email == null) return Unauthorized();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return NotFound(new { message = "User not found" });

            return Ok(new { user.Id, user.Email, user.Role });
        }

        // 🟠 UPDATE User Role (Admin Only)
        [HttpPut("{userId}/role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUserRole(Guid userId, [FromBody] UpdateRoleRequest request)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound(new { message = "User not found" });

            user.Role = request.Role;
            await _context.SaveChangesAsync();

            return Ok(new { message = "User role updated successfully" });
        }

        // 🔴 DELETE User (Admin Only)
        [HttpDelete("{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound(new { message = "User not found" });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully" });
        }
    }

    public class UpdateRoleRequest
    {
        public required string Role { get; set; }
    }
}
