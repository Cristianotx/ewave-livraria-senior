using System;
using System.Threading.Tasks;

namespace ToDo.Domain.Services
{
    public interface IEmprestimoService
    {
        Task CriarAsync(DateTime dataEmprestimo, DateTime dataVencimento, int livroId, int pessoaId);
        Task DevolverAsync(int id);
    }
}