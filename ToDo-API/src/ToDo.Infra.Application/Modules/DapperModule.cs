using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Reflection;
using ToDo.Infra.Dapper.Core;

namespace ToDo.Infra.Application.Modules
{
    public static class DapperModule
    {
        public static void Configure(IServiceCollection services)
        {
            var types = Assembly.GetAssembly(typeof(QueryBase)).GetTypes();
            var queries = types.Where(t => t.Name.EndsWith("Query")).ToDictionary(i => i.GetInterfaces()[0], i => i).ToList();
            queries.ForEach(item =>
            {
                var (service, implementation) = item;
                services.AddTransient(service, implementation);
            });
        }
    }
}