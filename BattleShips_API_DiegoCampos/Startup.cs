using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BattleShips_API_DiegoCampos.Models;
using BattleShips_API_DiegoCampos.Services;
using BattleShips_API_DiegoCampos.Services.Interfaces;

namespace BattleShips_API_DiegoCampos
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BattleShips_API_DiegoCampos", Version = "v1" });
            });
            services.AddScoped<IBoardService, BoardService>();
            services.AddMvc();


            // Mock Database InMemoryDatabase
            services.AddDbContext<PlayerDBContext>(options => options.UseInMemoryDatabase("Players"));
            services.AddDbContext<BoardDBContext>(options => options.UseInMemoryDatabase("Board"));

            // Cors Policys to allow use locally
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BattleShips_API_DiegoCampos v1"));
                app.UseCors("CorsPolicy");
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
