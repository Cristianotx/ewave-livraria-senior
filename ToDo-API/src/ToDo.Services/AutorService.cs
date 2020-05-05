using System;
using System.Threading.Tasks;
using ToDo.Domain.Entities;
using ToDo.Domain.Services;
using ToDo.Infra.Core;
using ToDo.Infra.Extensions;

namespace ToDo.Services
{
    public class AutorService : IAutorService
    {

        private readonly IRepository _repository;

        public AutorService(IRepository repository)
        {
            _repository = repository;
        }

        public async Task CriarAsync(Guid aggregateId, string nome)
        {
            if (nome.IsNullOrWhiteSpace()) throw new Autor.NomeObrigatorioException();

            var autor = new Autor(aggregateId, nome);
            await _repository.AddAsync(autor);
        }

        public async Task AlterarAsync(Guid aggregateId, string nome)
        {
            var autor = await _repository.GetByAsync<Autor>(aggregateId);
            if (autor.IsNull()) throw new Autor.NaoEncontradoException();

            autor.Alterar(nome);
        }

        public async Task AtivarAsync(Guid aggregateId)
        {
            var autor = await _repository.GetByAsync<Autor>(aggregateId);
            if (autor.IsNull()) throw new Autor.NaoEncontradoException();
            if (autor.Ativo) throw new Autor.JaAtivoException();

            autor.Ativar();
        }

        public async Task DesativarAsync(Guid aggregateId)
        {
            var autor = await _repository.GetByAsync<Autor>(aggregateId);
            if (autor.IsNull()) throw new Autor.NaoEncontradoException();
            if (autor.Ativo.IsFalse()) throw new Autor.JaInativoException();

            autor.Desativar();
        }
    }
}