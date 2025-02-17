using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace backend.Models.DTOs;

public record CreateUserDTO([Required] string Username, [Required] string Password, [Required] string Email, [Required] string FirstName, [Required] string LastName);