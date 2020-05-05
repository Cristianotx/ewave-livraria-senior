using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Swashbuckle.AspNetCore.SwaggerUI;
using ToDo.Infra.Application.Extensions;
using ToDo.Infra.Application.Modules;
using ToDo.Infra.Core;
using ToDo.Infra.EF.Data;
using ToDo.Infra.Providers;
using ToDo.Web.Api.Configs;

namespace ToDo.Web.Api
{
    public class Startup
    {

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .SwaggerConfigure()
                .AddCors()
                .AddOptions()
                .ConfigureContext(Configuration)
                .AddMvc(options => options.EnableEndpointRouting = false);

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.Configure<DbProvider>(d =>
            {
                d.ToDo = Configuration.GetConnectionString("ToDo");
            });

            RepositoryModule.Configure(services);
            ServiceModule.Configure(services);
            DapperModule.Configure(services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app
                .UseRouting()
                .UseCors(builder =>
                {
                    builder.AllowAnyHeader();
                    builder.AllowAnyOrigin();
                    builder.AllowAnyMethod();
                })
                .UseSwagger()
                .UseSwaggerUI(config =>
                {
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", "ToDo - WebApi");
                    config.DocExpansion(DocExpansion.None);
                })
                .UseEndpoints(endpoint =>
                {
                    endpoint.MapControllers();
                });


        }
    }
}
