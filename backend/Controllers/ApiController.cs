using Microsoft.AspNetCore.Mvc; // ✅ Required for API controllers

[ApiController]
[Route("api/[controller]")]
public class ApiController : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        return "API is working!";
    }
}
