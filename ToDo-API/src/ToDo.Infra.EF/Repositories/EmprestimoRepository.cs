using System;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Domain.Models;
using ToDo.Domain.Repositories;
using ToDo.Infra.EF.Data;

namespace ToDo.Infra.EF.Repositories
{
    public class EmprestimoRepository : Repository, IEmprestimoRepository
    {
        public EmprestimoRepository(ToDoContext dbContext) : base(dbContext)
        {
        }

        public async Task CriarAsync(DateTime dataEmprestimo, DateTime dataVencimento, int livroId, int pessoaId)
        {
            var emprestimo = new Emprestimo(dataEmprestimo, dataVencimento, livroId, pessoaId);
            await DbContext.Set<Emprestimo>().AddAsync(emprestimo);
        }

        public async Task<Emprestimo> ObterPorAsync(int id)
        {
            var emprestimo = DbContext.Set<Emprestimo>().Local.SingleOrDefault(e => e.Id == id);
            return emprestimo ?? await DbContext.Set<Emprestimo>().FindAsync(id);
        }
    }
}