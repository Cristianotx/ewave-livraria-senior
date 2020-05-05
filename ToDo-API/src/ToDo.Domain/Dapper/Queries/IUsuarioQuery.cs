using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Dapper.Queries
{
    public interface IUsuarioQuery
    {
        Task<IEnumerable<UsuarioConsultaModel>> ObterPorAsync(Pagination pagination);
        Task<UsuarioModel> ObterPorAsync(int id);
        Task<UsuarioModel> ObterPorAsync(Guid aggregateId);
    }
}