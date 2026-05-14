// // // using Backend.Models;
// // // using Microsoft.EntityFrameworkCore;

// // // var builder = WebApplication.CreateBuilder(args);

// // // builder.Services.AddControllers();

// // // // Add DbContext
// // // builder.Services.AddDbContext<DocumentContext>(options =>
// // //     // options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
// // //     options.UseSqlite("Data Source=document.db");

// // //     );

// // // // Config CORS
// // // builder.Services.AddCors(options =>
// // // {
// // //     options.AddPolicy("AllowAll",
// // //         policy =>
// // //         {
// // //             policy.AllowAnyOrigin()
// // //                   .AllowAnyMethod()
// // //                   .AllowAnyHeader();
// // //         });
// // // });

// // // builder.Services.AddOpenApi();

// // // var app = builder.Build();

// // // if (app.Environment.IsDevelopment())
// // // {
// // //     app.MapOpenApi();
// // // }

// // // app.UseCors("AllowAll");
// // // app.UseAuthorization();
// // // app.MapControllers();

// // // // Auto-migrate database on start
// // // using (var scope = app.Services.CreateScope())
// // // {
// // //     var context = scope.ServiceProvider.GetRequiredService<DocumentContext>();
// // //     context.Database.EnsureCreated();
// // // }

// // // app.Run();


// // using Backend.Models;
// // using Microsoft.EntityFrameworkCore;

// // var builder = WebApplication.CreateBuilder(args);

// // builder.Services.AddControllers();

// // // DbContext (SQLite)
// // builder.Services.AddDbContext<DocumentContext>(options =>
// //     options.UseSqlite("Data Source=document.db")
// // );

// // // CORS
// // builder.Services.AddCors(options =>
// // {
// //     options.AddPolicy("AllowAll", policy =>
// //     {
// //         policy.AllowAnyOrigin()
// //               .AllowAnyMethod()
// //               .AllowAnyHeader();
// //     });
// // });

// // builder.Services.AddOpenApi();

// // var app = builder.Build();

// // if (app.Environment.IsDevelopment())
// // {
// //     app.MapOpenApi();
// // }

// // app.UseCors("AllowAll");

// // app.UseAuthorization();

// // app.MapControllers();

// // // Auto apply migrations
// // using (var scope = app.Services.CreateScope())
// // {
// //     var context = scope.ServiceProvider.GetRequiredService<DocumentContext>();
// //     context.Database.Migrate();
// // }

// // app.Run();

// using Backend.Models;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);

// // Controllers
// builder.Services.AddControllers();

// // DbContext (SQLite)
// builder.Services.AddDbContext<DocumentContext>(options =>
//     options.UseSqlite("Data Source=document.db")
// );

// // CORS (IMPORTANT FOR FRONTEND)
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", policy =>
//     {
//         policy.AllowAnyOrigin()
//               .AllowAnyMethod()
//               .AllowAnyHeader();
//     });
// });

// // OpenAPI (optional, safe)
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // Swagger
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// // IMPORTANT ORDER (this matters)
// app.UseCors("AllowAll");

// app.UseAuthorization();

// app.MapControllers();

// // 🔥 SAFE DB INIT (IMPORTANT FIX)
// using (var scope = app.Services.CreateScope())
// {
//     var context = scope.ServiceProvider.GetRequiredService<DocumentContext>();

//     // safer than Migrate() for SQLite dev projects
//     context.Database.EnsureCreated();
// }

// app.Run();

using Backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<DocumentContext>(options =>
    options.UseSqlite("Data Source=document.db")
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DocumentContext>();
    context.Database.EnsureCreated();
}

app.Run();
