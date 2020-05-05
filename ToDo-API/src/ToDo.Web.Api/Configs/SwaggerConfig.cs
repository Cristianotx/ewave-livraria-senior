using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace ToDo.Web.Api.Configs
{
    public static class SwaggerConfig
    {
        public static IServiceCollection SwaggerConfigure(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "ToDo - Web Api",
                    Version = "v1",
                    Description = "Gerenciamento de livros"
                }); ;
            });

            return services;
        }
    }
}
