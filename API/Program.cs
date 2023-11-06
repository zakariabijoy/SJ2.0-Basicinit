using API.Data;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddApplicationServices(configuration);

builder.Services.AddCognitoIdentity();
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = configuration["Cognito:Authority"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false
    };
});

builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseNpgsql(configuration.GetConnectionString("SJ20DbConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins(configuration["CORS:Angular"], configuration["CORS:AngularHttp"]));

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");

app.Run();
