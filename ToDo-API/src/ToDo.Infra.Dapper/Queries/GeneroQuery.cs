using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Options;
using ToDo.Domain.Dapper.Models;
using ToDo.Domain.Dapper.Queries;
using ToDo.Infra.Core;
using ToDo.Infra.Dapper.Core;
using ToDo.Infra.Providers;

namespace ToDo.Infra.Dapper.Queries
{
    public class GeneroQuery : QueryBase, IGeneroQuery
    {
        public GeneroQuery(IOptions<DbProvider> provider) : base(provider?.Value?.ToDo)
        {

        }

        private const string Query = @"
        SELECT 
	        [g].[Id],
	        [g].[AggregateId],
	        [g].[Nome],
	        [g].[Ativo],
	        ROW_NUMBER() OVER(ORDER BY [g].[Nome]) AS [Row]
        FROM [dbo].[Genero] AS [g]
        {0}";

        private string QueryPaginada = $@"
        ;WITH [ie] AS 
         (
	        {Query}

         ) SELECT 
	        [ie].[AggregateId],
	        [ie].[Id],
	        [ie].[Nome],
            [ie].[Ativo]
          FROM [ie]
         WHERE 
	         [ie].[Row] > (@PageSize * (@PageNumber - 1)) 
	         AND [ie].[Row] <= (@PageSize * @PageNumber)
         ORDER BY [ie].[Row]";

        public async Task<IEnumerable<GeneroModel>> ObterPorAsync(Pagination pagination)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PageSize", pagination.PageSize, DbType.Int32);
            parameters.Add("@PageNumber", pagination.PageNumber, DbType.Int32);

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<GeneroModel>(string.Format(QueryPaginada, string.Empty), parameters);
            }
        }

        public async Task<GeneroModel> ObterPorAsync(int id)
        {
            var query = string.Format(Query, "WHERE [g].[Id] = @Id");

            using (var conn = CreateConnection())
            {
                return await conn.QuerySingleOrDefaultAsync<GeneroModel>(query, new { Id = id });
            }
        }

        public async Task<GeneroModel> ObterPorAsync(Guid aggregateId)
        {
            var query = string.Format(Query, "WHERE [g].[AggregateId] = @AggregateId");

            using (var conn = CreateConnection())
            {
                return await conn.QuerySingleOrDefaultAsync<GeneroModel>(query, new { AggregateId = aggregateId });
            }
        }

        public async Task<IEnumerable<GeneroModel>> ObterAtivosAsync()
        {
            var query = string.Format(Query, "WHERE [g].[Ativo] = 1");

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<GeneroModel>(query);
            }
        }
    }
}