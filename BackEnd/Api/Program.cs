using Api.Services;
using Api.Services.Interfaces;
using Bussines.Repository;
using Bussines.Repository.IRepository;
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
builder.Services.AddScoped<IInitializeUserAdmin, InitializeUserAdmin>();
builder.Services.AddScoped<IJwtToken, JwtToken>();
//======================

//Bussines
//Services
//=============
builder.Services.AddScoped<ITypesRolesServices, TypesRolesServices>();
builder.Services.AddScoped<IRolesServices, RolesServices>();
builder.Services.AddScoped<IEmployeesServices, EmployeesServices>();
builder.Services.AddScoped<IEmployeesRolesServices, EmployeesRolesServices>();
builder.Services.AddScoped<IUsersServices, UsersServices>();



//Repository
//============
builder.Services.AddScoped<ITypesRolesRepository,TypesRolesRepository>();
builder.Services.AddScoped<IRolesRepository, RolesRepository>();
builder.Services.AddScoped<IEmployeesRepository, EmployeesRepository>();
builder.Services.AddScoped<IEmployeesRolesRepository, EmployeesRolesRepository>();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();

//===============

//Database
//Connection
//================
builder.Services.AddScoped<IConnectionMySql, ConnectionMySql>();
//Generics
//=================
builder.Services.AddScoped<IGenerics<TypesRoles>, Generics<TypesRoles>>();
builder.Services.AddScoped<IGenerics<Roles>, Generics<Roles>>();
builder.Services.AddScoped<IGenerics<Employees>, Generics<Employees>>();
builder.Services.AddScoped<IGenerics<EmployeeRoles>, Generics<EmployeeRoles>>();
builder.Services.AddScoped<IGenerics<Users>, Generics<Users>>();



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
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
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
        var initializeAdmin = scope.ServiceProvider.GetService<IInitializeUserAdmin>();
        await initializeAdmin.Create();

    }
}
