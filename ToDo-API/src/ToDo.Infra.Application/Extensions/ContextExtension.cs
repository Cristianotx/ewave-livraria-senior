using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ToDo.Infra.EF.Data;

namespace ToDo.Infra.Application.Extensions
{
    public static class ContextExtension
    {
        public static IServiceCollection ConfigureContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("ToDo");

            services
                .AddDbContext<ToDoContext>(options =>
                {
                    options
                        .UseLazyLoadingProxies()
                        .UseSqlServer(connectionString);
                })
                .AddScoped<ToDoContext>();

            return services;
        }
    }
}
