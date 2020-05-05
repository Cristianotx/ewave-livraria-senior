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
    public class UsuarioQuery : QueryBase, IUsuarioQuery
    {
        public UsuarioQuery(IOptions<DbProvider> provider) : base(provider?.Value?.ToDo)
        {

        }

        public async Task<IEnumerable<UsuarioConsultaModel>> ObterPorAsync(Pagination pagination)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PageSize", pagination.PageSize, DbType.Int32);
            parameters.Add("@PageNumber", pagination.PageNumber, DbType.Int32);

            using (var conn = CreateConnection())
            {
                return await conn.QueryAsync<UsuarioConsultaModel>(UsuarioScript.Paginada, parameters);
            }
        }

        public async Task<UsuarioModel> ObterPorAsync(int id)
        {
            var query = $"{string.Format(UsuarioScript.Query, "WHERE [p].[Id] = @Id")} " +
                        $"{string.Format(PessoaScript.Endereco, "WHERE [p].[Id] = @Id")} " +
                        $"{string.Format(PessoaScript.Telefones, "WHERE [p].[Id] = @Id")} " +
                        $"{string.Format(PessoaScript.Emails, "WHERE [p].[Id] = @Id")} ";

            using (var conn = CreateConnection())
            using (var multi = await conn.QueryMultipleAsync(query, new { id }))
            {
                var usuario = await multi.ReadSingleOrDefaultAsync<UsuarioModel>();
                if (usuario.IsNull()) return usuario;

                usuario.Endereco = await multi.ReadSingleOrDefaultAsync<EnderecoModel>();
                usuario.Telefones = await multi.ReadAsync<TelefoneModel>();
                usuario.Emails = await multi.ReadAsync<EmailModel>();

                return usuario;
            }
        }

        public async Task<UsuarioModel> ObterPorAsync(Guid aggregateId)
        {
            var query = $"{string.Format(UsuarioScript.Query, "WHERE [p].[AggregateId] = @AggregateId")} " +
                        $"{string.Format(PessoaScript.Endereco, "WHERE [p].[AggregateId] = @AggregateId")} " +
                        $"{string.Format(PessoaScript.Telefones, "WHERE [p].[AggregateId] = @AggregateId")} " +
                        $"{string.Format(PessoaScript.Emails, "WHERE [p].[AggregateId] = @AggregateId")} ";

            using (var conn = CreateConnection())
            using (var multi = await conn.QueryMultipleAsync(query, new { aggregateId }))
            {
                var usuario = await multi.ReadSingleOrDefaultAsync<UsuarioModel>();
                if (usuario.IsNull()) return usuario;

                usuario.Endereco = await multi.ReadSingleOrDefaultAsync<EnderecoModel>();
                usuario.Telefones = await multi.ReadAsync<TelefoneModel>();
                usuario.Emails = await multi.ReadAsync<EmailModel>();

                return usuario;
            }
        }
    }
}