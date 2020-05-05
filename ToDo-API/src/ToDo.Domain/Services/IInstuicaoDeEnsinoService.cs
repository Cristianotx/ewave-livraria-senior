using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ToDo.Domain.Services
{
    public interface IInstuicaoDeEnsinoService
    {
        Task CriarAsync(Guid aggregateId, string nome, string cnpj, int cidadeId, string cep, string logradouro, int numero, string bairro, string complemento, List<Tuple<int, string>> telefones, List<Tuple<int, string>> emails);
        Task AlterarAsync(Guid aggregateId, string nome, string cnpj);
        Task AtivarAsync(Guid aggregateId);
        Task DesativarAsync(Guid aggregateId);
    }
}