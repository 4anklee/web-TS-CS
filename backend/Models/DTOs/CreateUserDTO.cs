namespace backend.Models.DTOs;

public record CreateUserDTO(string Username, string Password, string Email, string FirstName, string LastName);