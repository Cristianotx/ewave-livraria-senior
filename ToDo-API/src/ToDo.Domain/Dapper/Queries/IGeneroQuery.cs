using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Dapper.Queries
{
    public interface IGeneroQuery
    {
        Task<IEnumerable<GeneroModel>> ObterPorAsync(Pagination pagination);
        Task<GeneroModel> ObterPorAsync(int id);
        Task<GeneroModel> ObterPorAsync(Guid aggregateId);
        Task<IEnumerable<GeneroModel>> ObterAtivosAsync();

    }
}