using System;
using System.Threading.Tasks;

namespace ToDo.Domain.Services
{
    public interface IPessoaService
    {
        Task AlterarEnderecoAsync(Guid aggregateId, int cidadeId, string cep, string logradouro, int numero, string bairro, string complemento);

        Task AdicionarTelefoneAsync(Guid aggregateId, string numero, int tipoId);
        Task AlterarTelefoneAsync(Guid aggregateId, int id,  string numero, int tipoId);
        Task RemoverTelefoneAsync(Guid aggregateId, int id);

        Task AdicionarEmailAsync(Guid aggregateId, string endereco, int tipoId);
        Task AlterarEmailAsync(Guid aggregateId, int id, string endereco, int tipoId);
        Task RemoverEmailAsync(Guid aggregateId, int id);
    }
}
