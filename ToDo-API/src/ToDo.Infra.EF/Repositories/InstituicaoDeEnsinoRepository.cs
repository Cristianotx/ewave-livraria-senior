using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDo.Domain.Models;
using ToDo.Domain.Repositories;
using ToDo.Infra.EF.Data;

namespace ToDo.Infra.EF.Repositories
{
    public class InstituicaoDeEnsinoRepository : Repository, IInstituicaoDeEnsinoRepository
    {
        public InstituicaoDeEnsinoRepository(ToDoContext dbContext) : base(dbContext)
        {
        }

        public async Task CriarAsync(InstituicaoDeEnsino instituicaoDeEnsino)
        {
            await DbContext.Set<InstituicaoDeEnsino>().AddAsync(instituicaoDeEnsino);
        }

        public async Task<InstituicaoDeEnsino> ObterPorAsync(int id)
        {
            var instituicao = DbContext.Set<InstituicaoDeEnsino>().Local.SingleOrDefault(e => e.PessoaId == id);
            return instituicao ?? await DbContext.Set<InstituicaoDeEnsino>().FindAsync(id);
        }

        public async Task<InstituicaoDeEnsino> ObterPorAsync(Guid aggregateId)
        {
            var instituicao = DbContext.Set<InstituicaoDeEnsino>().Local.SingleOrDefault(e => e.Pessoa.AggregateId == aggregateId);
            return instituicao ?? await DbContext.Set<InstituicaoDeEnsino>().SingleOrDefaultAsync(e => e.Pessoa.AggregateId == aggregateId);
        }

        public async Task<InstituicaoDeEnsino> ObterPorAsync(string cnpj)
        {
            var instituicao = DbContext.Set<InstituicaoDeEnsino>().Local.SingleOrDefault(e => e.Cnpj == cnpj);
            return instituicao ?? await DbContext.Set<InstituicaoDeEnsino>().SingleOrDefaultAsync(e => e.Cnpj == cnpj);
        }
    }
}