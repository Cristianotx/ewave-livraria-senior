using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDo.Domain.Models;
using ToDo.Domain.Repositories;
using ToDo.Infra.EF.Data;

namespace ToDo.Infra.EF.Repositories
{
    public class UsuarioRepository : Repository, IUsuarioRepository
    {
        public UsuarioRepository(ToDoContext dbContext) : base(dbContext)
        {
        }

        public async Task CriarAsync(Usuario usuario) => await DbContext.Set<Usuario>().AddAsync(usuario);


        public async Task<Usuario> ObterPorAsync(int id)
        {
            var usuario = DbContext.Set<Usuario>().Local.SingleOrDefault(e => e.PessoaId == id);
            return usuario ?? await DbContext.Set<Usuario>().FindAsync(id);
        }

        public async Task<Usuario> ObterPorAsync(Guid aggregateId)
        {
            var usuario = DbContext.Set<Usuario>().Local.SingleOrDefault(e => e.Pessoa.AggregateId == aggregateId);
            return usuario ?? await DbContext.Set<Usuario>().SingleOrDefaultAsync(e => e.Pessoa.AggregateId == aggregateId);
        }

        public async Task<Usuario> ObterPorAsync(string cpf)
        {
            var usuario = DbContext.Set<Usuario>().Local.SingleOrDefault(e => e.Cpf == cpf);
            return usuario ?? await DbContext.Set<Usuario>().SingleOrDefaultAsync(e => e.Cpf == cpf);

        }
    }
}