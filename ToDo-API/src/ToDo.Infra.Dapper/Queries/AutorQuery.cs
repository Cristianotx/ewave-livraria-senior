using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;
using ToDo.Domain.Dapper.Queries;
using ToDo.Infra.Core;
using ToDo.Infra.Dapper.Core;
using ToDo.Infra.Providers;

namespace ToDo.Infra.Dapper.Queries
{
    public class AutorQuery : QueryBase, IAutorQuery
    {
        public AutorQuery(IOptions<DbProvider> provider) : base(provider?.Value?.ToDo)
        {

        }

        private const string Query = @"
        SELECT 
	        [a].[Id],
	        [a].[AggregateId],
	        [a].[Nome],
	        [a].[Ativo],
	        ROW_NUMBER() OVER(ORDER BY [a].[Nome]) AS [Row]
        FROM [dbo].[Autor] AS [a]
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

        public async Task<IEnumerable<AutorModel>> ObterPorAsync(Pagination pagination)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PageSize", pagination.PageSize, DbType.Int32);
            parameters.Add("@PageNumber", pagination.PageNumber, DbType.Int32);

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<AutorModel>(string.Format(QueryPaginada, string.Empty), parameters);
            }
        }

        public async Task<AutorModel> ObterPorAsync(int id)
        {
            var query = string.Format(Query, "WHERE [a].[Id] = @Id");

            using (var conn = CreateConnection())
            {
                return await conn.QuerySingleOrDefaultAsync<AutorModel>(query, new { Id = id });
            }
        }

        public async Task<AutorModel> ObterPorAsync(Guid aggregateId)
        {
            var query = string.Format(Query, "WHERE [a].[AggregateId] = @AggregateId");

            using (var conn = CreateConnection())
            {
                return await conn.QuerySingleOrDefaultAsync<AutorModel>(query, new { AggregateId = aggregateId });
            }
        }

        public async Task<IEnumerable<AutorModel>> ObterAtivosAsync()
        {
            var query = string.Format(Query, "WHERE [a].[Ativo] = 1");

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<AutorModel>(query);
            }
        }
    }
}