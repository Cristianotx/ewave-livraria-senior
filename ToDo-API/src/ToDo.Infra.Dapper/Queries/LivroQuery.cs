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
using ToDo.Infra.Dapper.Scripts;
using ToDo.Infra.Providers;

namespace ToDo.Infra.Dapper.Queries
{
    public class LivroQuery : QueryBase, ILivrosQuery
    {
        public LivroQuery(IOptions<DbProvider> provider) : base(provider?.Value?.ToDo)
        {

        }

        public async Task<IEnumerable<LivroConsultaModel>> ObterPorAsync(Pagination pagination)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PageSize", pagination.PageSize, DbType.Int32);
            parameters.Add("@PageNumber", pagination.PageNumber, DbType.Int32);

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<LivroConsultaModel>(LivroScript.Paginada, parameters);
            }
        }

        public async Task<LivroModel> ObterPorAsync(int id)
        {
            var query = string.Format(LivroScript.Query, "WHERE [l].[Id] = @Id");

            using (var conn = CreateConnection())
            {
                return await conn.QuerySingleOrDefaultAsync<LivroModel>(query, new { Id = id });
            }
        }

        public async Task<LivroModel> ObterPorAsync(Guid aggregateId)
        {
            var query = string.Format(LivroScript.Query, "WHERE [l].[AggregateId] = @aggregateId");

            using (var conn = CreateConnection())
            {
                return await conn.QuerySingleOrDefaultAsync<LivroModel>(query, new { AggregateId = aggregateId });
            }
        }
    }
}