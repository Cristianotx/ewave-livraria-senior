using System;
using System.Threading.Tasks;
using ToDo.Domain.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Repositories
{
    public interface IInstituicaoDeEnsinoRepository : IRepository
    {
        Task CriarAsync(InstituicaoDeEnsino instituicaoDeEnsino);
        Task<InstituicaoDeEnsino> ObterPorAsync(int id);
        Task<InstituicaoDeEnsino> ObterPorAsync(Guid aggregateId);
        Task<InstituicaoDeEnsino> ObterPorAsync(string cnpj);
    }
}