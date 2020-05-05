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
using ToDo.Infra.Extensions;
using ToDo.Infra.Providers;

namespace ToDo.Infra.Dapper.Queries
{
    public class InsituicaoDeEnsinoQuery : QueryBase, IInstituicaoDeEnsinoQuery
    {
        public InsituicaoDeEnsinoQuery(IOptions<DbProvider> provider) : base(provider?.Value?.ToDo)
        {

        }

        public async Task<IEnumerable<InstituicaoDeEnsinoConsultaModel>> ObterPorAsync(Pagination pagination)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PageSize", pagination.PageSize, DbType.Int32);
            parameters.Add("@PageNumber", pagination.PageNumber, DbType.Int32);

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<InstituicaoDeEnsinoConsultaModel>(InstituicaoDeEnsinoScript.Paginada, parameters);
            }
        }

        public async Task<InstituicaoDeEnsinoModel> ObterPorAsync(int id)
        {
            var query = $"{string.Format(InstituicaoDeEnsinoScript.Query, "WHERE [p].[Id] = @Id")}" +
                        $"{string.Format(PessoaScript.Endereco, "WHERE [p].[Id] = @Id")} " +
                        $"{string.Format(PessoaScript.Telefones, "WHERE [p].[Id] = @Id")} " +
                        $"{string.Format(PessoaScript.Emails, "WHERE [p].[Id] = @Id")} ";

            using (var conn = CreateConnection())
            using (var multi = await conn.QueryMultipleAsync(query, new { id }))
            {
                var instituicaoDeEnsino = await multi.ReadSingleOrDefaultAsync<InstituicaoDeEnsinoModel>();
                if (instituicaoDeEnsino.IsNull()) return instituicaoDeEnsino;

                instituicaoDeEnsino.Endereco = await multi.ReadSingleOrDefaultAsync<EnderecoModel>();
                instituicaoDeEnsino.Telefones = await multi.ReadAsync<TelefoneModel>();
                instituicaoDeEnsino.Emails = await multi.ReadAsync<EmailModel>();

                return instituicaoDeEnsino;
            }
        }

        public async Task<InstituicaoDeEnsinoModel> ObterPorAsync(Guid aggregateId)
        {
            var query = $"{string.Format(InstituicaoDeEnsinoScript.Query, "WHERE [p].[AggregateId] = @AggregateId")}" +
                        $"{string.Format(PessoaScript.Endereco, "WHERE [p].[AggregateId] = @AggregateId")} " +
                        $"{string.Format(PessoaScript.Telefones, "WHERE [p].[AggregateId] = @AggregateId")} " +
                        $"{string.Format(PessoaScript.Emails, "WHERE [p].[AggregateId] = @AggregateId")} ";

            using (var conn = CreateConnection())
            using (var multi = await conn.QueryMultipleAsync(query, new { aggregateId }))
            {
                var instituicaoDeEnsino = await multi.ReadSingleOrDefaultAsync<InstituicaoDeEnsinoModel>();
                if (instituicaoDeEnsino.IsNull()) return instituicaoDeEnsino;

                instituicaoDeEnsino.Endereco = await multi.ReadSingleOrDefaultAsync<EnderecoModel>();
                instituicaoDeEnsino.Telefones = await multi.ReadAsync<TelefoneModel>();
                instituicaoDeEnsino.Emails = await multi.ReadAsync<EmailModel>();

                return instituicaoDeEnsino;
            }
        }

        public async Task<IEnumerable<InstituicaoDeEnsinoModel>> ObterAtivasAsync()
        {
            var query = string.Format(InstituicaoDeEnsinoScript.Query, "WHERE [p].[Ativo] = 1");

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<InstituicaoDeEnsinoModel>(query);
            }
        }
    }
}