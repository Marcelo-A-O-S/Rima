using Api.Services;
using Api.Services.Interfaces;
using Bussines.Repository;
using Bussines.Services;
using Bussines.Services.IServices;
using Database.Connection;
using Database.Connection.Interface;
using Database.Generics;
using Database.Generics.Interface;
using Domain.Entities;
using Org.BouncyCastle.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Api
//Services
//========================
builder.Services.AddScoped<ICreateTypesRoles, CreateTypesRoles>();
builder.Services.AddScoped<ICreateRoles, CreateRoles>();

//Bussines
//Services
//=============
builder.Services.AddScoped<ITypesRolesServices, TypesRolesServices>();
builder.Services.AddScoped<IRolesServices, RolesServices>();


//Repository
//============
builder.Services.AddScoped<TypesRolesRepository>();
builder.Services.AddScoped<RolesRepository>();
//===============
//Database
//Connection
//================
builder.Services.AddScoped<IConnectionMySql, ConnectionMySql>();
//Generics
//=================
builder.Services.AddScoped<IGenerics<TypesRoles>, Generics<TypesRoles>>();


var app = builder.Build();
createDatabase(app);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
if (app.Environment.IsProduction())
{

}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
async Task createDatabase(WebApplication app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    using (var scope = scopedFactory.CreateScope())
    {
        var conn = new ConnectionMySql();
        await conn.VerifyDatabaseExists();
        var typerolesservice = scope.ServiceProvider.GetService<ICreateTypesRoles>();
        await typerolesservice.Create();
        var rolesServices = scope.ServiceProvider.GetService<ICreateRoles>();
        await rolesServices.Create();

    }
}
