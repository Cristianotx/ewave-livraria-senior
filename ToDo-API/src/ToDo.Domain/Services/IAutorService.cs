using System;
using System.Threading.Tasks;

namespace ToDo.Domain.Services
{
    public interface IAutorService
    {
        Task CriarAsync(Guid aggregateId, string nome);
        Task AlterarAsync(Guid aggregateId, string nome);
        Task AtivarAsync(Guid aggregateId);
        Task DesativarAsync(Guid aggregateId);
    }
}