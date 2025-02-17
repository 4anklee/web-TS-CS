using backend.Models.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(UserService userService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
    {
        var users = await userService.GetUsers();   
        return Ok(users);
    }   
    
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDTO>> GetUser(int id)
    {
        var user = await userService.GetUser(id);
        return Ok(user);
    }
    
    [HttpPost]
    public async Task<ActionResult> CreateUser(CreateUserDTO userDto)
    {
        await userService.CreateUser(userDto);
        return Created();
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUser(int id, CreateUserDTO userDto)
    {
        await userService.UpdateUser(id, userDto);
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        await userService.DeleteUser(id);
        return Ok();
    }
}