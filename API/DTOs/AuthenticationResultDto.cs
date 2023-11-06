namespace API.DTOs;

public class AuthenticationResultDto
{
    public AuthToken AuthenticationResult { get; set; } = new();
    public string ChallengeName { get; set; }
}

public class AuthToken
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}