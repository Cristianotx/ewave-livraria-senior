using Dapper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;
using ToDo.Domain.Dapper.Queries;
using ToDo.Infra.Dapper.Core;
using ToDo.Infra.Providers;

namespace ToDo.Infra.Dapper.Queries
{
    public class DropDownQuery : QueryBase, IDropDownQuery
    {
        public DropDownQuery(IOptions<DbProvider> provider) : base(provider?.Value?.ToDo)
        {

        }

        public async Task<IEnumerable<DropDown>> ObterEstadosBrasileirosAsync()
        {
            var query = @"
            SELECT 
	            [e].[Id],
	            [e].[Nome]
            FROM [dbo].[Estado] AS [e]
            ORDER BY [e].[Nome]";

            using (var connection = CreateConnection())
            {
                return await connection.QueryAsync<DropDown>(query);
            }
        }

        public async Task<IEnumerable<DropDown>> ObterCidadesPorEstadoIdAsync(int estadoId)
        {
            var query = @"
            SELECT 
	            [c].[Id],
	            [c].[Nome] 
            FROM [dbo].[Cidade] AS [c]
            WHERE [c].[EstadoId] = @EstadoId
            ORDER BY [c].[Nome]";

            using (var connection = CreateConnection())
            {
                return await connection.QueryAsync<DropDown>(query, new { estadoId });
            }
        }
    }
}