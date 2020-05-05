using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Dapper.Queries
{
    public interface IAutorQuery
    {
        Task<IEnumerable<AutorModel>> ObterPorAsync(Pagination pagination);
        Task<AutorModel> ObterPorAsync(int id);
        Task<AutorModel> ObterPorAsync(Guid aggregateId);
        Task<IEnumerable<AutorModel>> ObterAtivosAsync();
    }
}