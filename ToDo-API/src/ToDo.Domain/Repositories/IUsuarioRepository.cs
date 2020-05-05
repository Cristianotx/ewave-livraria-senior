using System;
using System.Threading.Tasks;
using ToDo.Domain.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Repositories
{
    public interface IUsuarioRepository : IRepository
    {
        Task CriarAsync(Usuario usuario);
        Task<Usuario> ObterPorAsync(int id);
        Task<Usuario> ObterPorAsync(Guid aggregateId);
        Task<Usuario> ObterPorAsync(string cpf);
    }
}