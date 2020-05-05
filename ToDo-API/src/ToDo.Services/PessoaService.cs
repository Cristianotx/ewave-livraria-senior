using System;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Domain.Entities;
using ToDo.Domain.Enums;
using ToDo.Domain.Models;
using ToDo.Domain.Services;
using ToDo.Infra.Core;
using ToDo.Infra.Extensions;

namespace ToDo.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IRepository _repository;

        public PessoaService(IRepository repository)
        {
            _repository = repository;
        }

        public async Task AlterarEnderecoAsync(Guid aggregateId, int cidadeId, string cep, string logradouro, int numero, string bairro, string complemento)
        {
            var pessoa = await _repository.GetByAsync<Pessoa>(aggregateId);
            if (pessoa.IsNull()) throw new Pessoa.NaoEncontradaException();

            pessoa.Endereco.Alterar(cidadeId, cep, logradouro, numero, bairro, complemento);
        }
        
        public async Task AdicionarTelefoneAsync(Guid aggregateId, string numero, int tipoId)
        {
            var pessoa = await _repository.GetByAsync<Pessoa>(aggregateId);
            if (pessoa.IsNull()) throw new Pessoa.NaoEncontradaException();

            pessoa.AdicionarTelefone((ETelefoneTipo)tipoId, numero);
        }

        public async Task AlterarTelefoneAsync(Guid aggregateId, int id, string numero, int tipoId)
        {
            var pessoa = await _repository.GetByAsync<Pessoa>(aggregateId);
            if (pessoa.IsNull()) throw new Pessoa.NaoEncontradaException();

            var telefone = pessoa.Telefones.SingleOrDefault(t => t.Id == id);
            if (telefone.IsNull()) throw new Telefone.NaoExisteException();

            if (pessoa.Telefones.Any(t => t.Numero == numero)) 
                throw new Telefone.JaExisteException();

            telefone?.Alterar((ETelefoneTipo)tipoId, numero);
        }

        public async Task RemoverTelefoneAsync(Guid aggregateId, int id)
        {
            var pessoa = await _repository.GetByAsync<Pessoa>(aggregateId);
            if (pessoa.IsNull()) throw new Pessoa.NaoEncontradaException();

            var telefone = pessoa.Telefones.SingleOrDefault(t => t.Id == id);
            if (telefone.IsNull()) throw new Email.JaExisteException();

            await _repository.RemoverAsync<Telefone>(id);
        } 
        
        public async Task AdicionarEmailAsync(Guid aggregateId, string endereco, int tipoId)
        {
            var pessoa = await _repository.GetByAsync<Pessoa>(aggregateId);
            if (pessoa.IsNull()) throw new Pessoa.NaoEncontradaException();

            pessoa.AdicionarEmail((EEmailTipo)tipoId, endereco);
        }

        public async Task AlterarEmailAsync(Guid aggregateId, int id, string endereco, int tipoId)
        {
            var pessoa = await _repository.GetByAsync<Pessoa>(aggregateId);
            if (pessoa.IsNull()) throw new Pessoa.NaoEncontradaException();

            var email = pessoa.Emails.SingleOrDefault(e => e.Id == id);
            if (email.IsNull()) throw new Email.NaoExisteException();

            if (pessoa.Emails.Any(e => e.Endereco == endereco))
                throw new Email.NaoExisteException();

            email?.Alterar((EEmailTipo)tipoId, endereco);
        }

        public async Task RemoverEmailAsync(Guid aggregateId, int id)
        {
            var pessoa = await _repository.GetByAsync<Pessoa>(aggregateId);
            if (pessoa.IsNull()) throw new Pessoa.NaoEncontradaException();

            var email = pessoa.Emails.SingleOrDefault(e => e.Id == id);
            if (email.IsNull()) throw new Email.JaExisteException();
            
            await _repository.RemoverAsync<Email>(id);
        }
    }
}
