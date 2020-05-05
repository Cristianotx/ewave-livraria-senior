using System;
using System.Threading.Tasks;
using ToDo.Domain.Entities;
using ToDo.Domain.Services;
using ToDo.Infra.Core;
using ToDo.Infra.Extensions;

namespace ToDo.Services
{
    public class GeneroService : IGeneroService
    {
        private readonly IRepository _repository;

        public GeneroService(IRepository repository)
        {
            _repository = repository;
        }

        public async Task CriarAsync(Guid aggregateId, string nome)
        {
            if (nome.IsNullOrWhiteSpace()) throw new Genero.NomeObrigatorioException();

            var genero = new Genero(aggregateId, nome);
            await _repository.AddAsync(genero);
        }

        public async Task AlterarAsync(Guid aggregateId, string nome)
        {
            if (nome.IsNullOrWhiteSpace()) throw new Genero.NomeObrigatorioException();

            var genero = await _repository.GetByAsync<Genero>(aggregateId);
            if (genero.IsNull()) throw new Genero.NaoEncontradoException();

            genero.Alterar(nome);
        }

        public async Task AtivarAsync(Guid aggregateId)
        {
            var genero = await _repository.GetByAsync<Genero>(aggregateId);
            if (genero.IsNull()) throw new Genero.NaoEncontradoException();
            if (genero.Ativo) throw new Genero.JaAtivoException();

            genero.Ativar();
        }

        public async Task DesativarAsync(Guid aggregateId)
        {
            var genero = await _repository.GetByAsync<Genero>(aggregateId);
            if (genero.IsNull()) throw new Genero.NaoEncontradoException();
            if (genero.Ativo.IsFalse()) throw new Genero.JaInativoException();

            genero.Desativar();
        }
    }
}