using API.DTOs;
using API.Interfaces;
using System.Text.Json;
using HttpMethod = System.Net.Http.HttpMethod;

namespace API.Services;

public class AuthService : IAuthService
{
    private readonly IHttpClientFactory _httpClient;
    private readonly IConfiguration _configuration;

    public AuthService(IHttpClientFactory httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<AuthenticationResultDto> Login(LoginDto loginDto)
    {
        var client = _httpClient.CreateClient();

        var request = new HttpRequestMessage(HttpMethod.Post, _configuration["Cognito:URL"]);

        request.Headers.Add("X-Amz-Target", "AWSCognitoIdentityProviderService.InitiateAuth");

        var content = new StringContent(
                                    JsonSerializer.Serialize(
                                        new
                                        {
                                            AuthParameters = new { USERNAME = loginDto.Username, PASSWORD = loginDto.Password },
                                            AuthFlow = _configuration["Cognito:AuthFlow"],
                                            ClientId = _configuration["Cognito:ClientId"],
                                        }
                                     ),
                                    null,
                                    "application/x-amz-json-1.1");

        request.Content = content;

        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            var responseString = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<AuthenticationResultDto>(responseString);
        }

        return new AuthenticationResultDto();
    }

    public async Task<AuthenticationResultDto> RefreshToken(string refreshToken)
    {
        var client = _httpClient.CreateClient();

        var request = new HttpRequestMessage(HttpMethod.Post, _configuration["Cognito:URL"]);

        request.Headers.Add("X-Amz-Target", "AWSCognitoIdentityProviderService.InitiateAuth");

        var content = new StringContent(
                                    JsonSerializer.Serialize(
                                        new
                                        {
                                            AuthParameters = new { REFRESH_TOKEN = refreshToken },
                                            AuthFlow = _configuration["Cognito:RefreshTokenAuthFlow"],
                                            ClientId = _configuration["Cognito:ClientId"],
                                        }
                                     ),
                                    null,
                                    "application/x-amz-json-1.1");

        request.Content = content;

        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            var responseString = await response.Content.ReadAsStringAsync();
            var authenticationResultDto = JsonSerializer.Deserialize<AuthenticationResultDto>(responseString);
            authenticationResultDto.AuthenticationResult.RefreshToken = refreshToken;
            return authenticationResultDto;
        }

        return new AuthenticationResultDto();
    }


}