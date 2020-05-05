using System;
using System.Threading.Tasks;

namespace ToDo.Domain.Services
{
    public interface ILivroService
    {
        Task CriarAsync(Guid aggregateId, string titulo,  string sinopse, int paginas, string capa, int autorId, int generoId);
        Task AlterarAsync(Guid aggregateId, string titulo,  string sinopse, int paginas, string capa, int autorId, int generoId);
    }
}