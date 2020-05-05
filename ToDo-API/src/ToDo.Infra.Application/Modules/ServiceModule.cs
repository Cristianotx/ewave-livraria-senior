using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Reflection;
using ToDo.Services;

namespace ToDo.Infra.Application.Modules
{
    public static class ServiceModule
    {
        public static void Configure(IServiceCollection sc)
        {
            var services = Assembly.GetAssembly(typeof(PessoaService))
               .GetTypes()
               .Where(t => t.Name.EndsWith("Service"))
            .ToDictionary(t => t.GetInterfaces()[0], t => t);

            foreach (var (service, implemetation) in services)
            {
                sc.AddTransient(service, implemetation);
            }
        }
    }
}
