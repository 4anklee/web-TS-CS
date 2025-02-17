using AutoMapper;
using backend.Models.DTOs;

namespace backend.Models.Maps;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDTO>();
        CreateMap<UserDTO, User>();
        CreateMap<CreateUserDTO, User>();
    }
}