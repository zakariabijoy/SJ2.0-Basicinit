namespace API.DTOs
{
    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RefreshTokenDto
    {
        public string RefreshToken { get; set; }
    }

    public class CreatePasswordDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class ForgotPasswordRequestDto
    {
        public string Username { get; set; }
    }

    public class ConfirmForgotPasswordRequestDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmationCode { get; set; }
    }
}