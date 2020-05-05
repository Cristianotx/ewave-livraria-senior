using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Dapper.Queries
{
    public interface ILivrosQuery
    {
        Task<IEnumerable<LivroConsultaModel>> ObterPorAsync(Pagination pagination);
        Task<LivroModel> ObterPorAsync(int id);
        Task<LivroModel> ObterPorAsync(Guid aggregateId);
    }
}