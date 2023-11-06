using API.DTOs;

namespace API.Interfaces;

public interface IAuthService
{
    Task<AuthenticationResultDto> Login(LoginDto loginDto);
    Task<AuthenticationResultDto> RefreshToken(string refreshToken);
}
