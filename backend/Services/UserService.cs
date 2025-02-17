using AutoMapper;
using backend.Context;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService(ApplicationDbContext context, IMapper mapper)
{
    public async Task<IEnumerable<UserDTO>> GetUsers()
    {
        var users = await context.Users
            .Select(u => mapper.Map<UserDTO>(u))
            .ToListAsync();
        
        return users;
    }

    public async Task<UserDTO> GetUser(int id)
    {
        var user = await context.Users
            .Where(u => u.Id == id)
            .Select(u => mapper.Map<UserDTO>(u))
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException("User not found");
        
        return user;
    }

    public async Task CreateUser(CreateUserDTO userDto)
    {
        var user = mapper.Map<User>(userDto);
        context.Users.Add(user);
        await context.SaveChangesAsync();
    }
    
    public async Task UpdateUser(int id, CreateUserDTO userDto)
    {
        var user = await context.Users
            .Where(u => u.Id == id)
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException("User not found");

        mapper.Map(userDto, user);
        await context.SaveChangesAsync();
    }
    
    public async Task DeleteUser(int id)
    {
        var user = await context.Users
            .Where(u => u.Id == id)
            .FirstOrDefaultAsync() ?? throw new InvalidOperationException("User not found");

        context.Users.Remove(user);
        await context.SaveChangesAsync();
    }
}