using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Reflection;
using ToDo.Infra.Core;
using ToDo.Infra.EF.Data;

namespace ToDo.Infra.Application.Modules
{
    public static class RepositoryModule
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddTransient<IRepository, Repository>();

            var repositories = Assembly.GetAssembly(typeof(Repository))
                .GetTypes()
                .Where(t => t.BaseType == typeof(Repository))
                .Where(t => t.Name.EndsWith(nameof(Repository)))
                .ToDictionary(t => t.GetInterfaces()[1], t => t);

            foreach (var (service, implemetation) in repositories)
            {
                services.AddTransient(service, implemetation);
            }

        }
    }
}
