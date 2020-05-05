using System;
using System.Threading.Tasks;
using ToDo.Domain.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Repositories
{
    public interface IEmprestimoRepository : IRepository
    {
        Task CriarAsync(DateTime dataEmprestimo, DateTime dataVencimento, int livroId, int pessoaId);
        Task<Emprestimo> ObterPorAsync(int id);
    }
}