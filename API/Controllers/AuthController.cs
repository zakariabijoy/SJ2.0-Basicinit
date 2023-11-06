using Amazon;
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;
    private readonly IConfiguration _configuration;

    public AuthController(IAuthService authService, IConfiguration configuration)
    {
        _authService = authService;
        _configuration = configuration;
    }


    [AllowAnonymous]
    [HttpPost("Cognitologin")]
    public async Task<ActionResult<AuthenticationResultDto>> CognitoLogin(LoginDto loginDto)
    {
        var authenticationResultDto = await _authService.Login(loginDto);

        if (authenticationResultDto.AuthenticationResult.AccessToken == null && authenticationResultDto.ChallengeName == null)
            return BadRequest("Invalid Credentials");

        return Ok(authenticationResultDto);
    }

    [AllowAnonymous]
    [HttpPost("CognitoRefreshToken")]
    public async Task<ActionResult<AuthenticationResultDto>> CognitoRefreshToken(RefreshTokenDto refreshTokenDto)
    {
        var authenticationResultDto = await _authService.RefreshToken(refreshTokenDto.RefreshToken);

        if (authenticationResultDto.AuthenticationResult.AccessToken == null)
            return BadRequest("Session Timeout");

        return Ok(authenticationResultDto.AuthenticationResult);

    }

    [AllowAnonymous]
    [HttpPost("CognitoCreatePassword")]
    public async Task<ActionResult> CognitoCreatePassword(CreatePasswordDto createPasswordDto)
    {
        var cognito = new AmazonCognitoIdentityProviderClient(RegionEndpoint.APSouth1);

        var request = new AdminSetUserPasswordRequest
        {
            Password = createPasswordDto.Password,
            Permanent = true,
            Username = createPasswordDto.Username,
            UserPoolId = _configuration["Cognito:UserPoolId"]
        };

        try
        {
            var response = await cognito.AdminSetUserPasswordAsync(request);
            return Ok(response);
        }
        catch (Exception ex)
        {

            return BadRequest(ex.Message.ToString());
        }
    }

    [AllowAnonymous]
    [HttpPost("CognitoForgotPasswordRequest")]
    public async Task<ActionResult> CognitoForgotPasswordRequest(ForgotPasswordRequestDto forgotPasswordRequestDto)
    {
        var cognito = new AmazonCognitoIdentityProviderClient(RegionEndpoint.APSouth1);

        var request = new ForgotPasswordRequest
        {
            Username = forgotPasswordRequestDto.Username,
            ClientId = _configuration["Cognito:ClientId"]
            
        };

        try
        {
            var response = await cognito.ForgotPasswordAsync(request);
            return Ok(response);
        }
        catch (Exception ex)
        {

            return BadRequest(ex.Message.ToString());
        }
    }

    [AllowAnonymous]
    [HttpPost("CognitoForgotPassword")]
    public async Task<ActionResult> CognitoForgotPassword(ConfirmForgotPasswordRequestDto confirmForgotPasswordRequestDto)
    {
        var cognito = new AmazonCognitoIdentityProviderClient(RegionEndpoint.APSouth1);

        var request = new ConfirmForgotPasswordRequest
        {
            Username = confirmForgotPasswordRequestDto.Username,
            ClientId = _configuration["Cognito:ClientId"],
            Password = confirmForgotPasswordRequestDto.Password,
            ConfirmationCode = confirmForgotPasswordRequestDto.ConfirmationCode

        };

        try
        {
            var response = await cognito.ConfirmForgotPasswordAsync(request);
            return Ok(response);
        }
        catch (Exception ex)
        {

            return BadRequest(ex.Message.ToString());
        }
    }

}
