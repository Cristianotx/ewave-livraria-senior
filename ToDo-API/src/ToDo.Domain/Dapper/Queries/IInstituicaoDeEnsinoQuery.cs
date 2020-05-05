using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Dapper.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Dapper.Queries
{
    public interface IInstituicaoDeEnsinoQuery
    {
        Task<IEnumerable<InstituicaoDeEnsinoConsultaModel>> ObterPorAsync(Pagination pagination);
        Task<InstituicaoDeEnsinoModel> ObterPorAsync(int id);
        Task<InstituicaoDeEnsinoModel> ObterPorAsync(Guid aggregateId);
        Task<IEnumerable<InstituicaoDeEnsinoModel>> ObterAtivasAsync();
    }
}