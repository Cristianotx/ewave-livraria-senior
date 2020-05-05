using System;
using System.Threading.Tasks;
using ToDo.Domain.Entities;
using ToDo.Domain.Services;
using ToDo.Infra.Core;
using ToDo.Infra.Extensions;

namespace ToDo.Services
{
    public class LivroService : ILivroService
    {
        private readonly IRepository _repository;

        public LivroService(IRepository repository)
        {
            _repository = repository;
        }

        public async Task CriarAsync(Guid aggregateId, string titulo, string sinopse, int paginas, string capa, int autorId, int generoId)
        {
            var livro = new Livro(aggregateId, titulo, sinopse, paginas, capa, autorId, generoId);
            await _repository.AddAsync(livro);
        }

        public async Task AlterarAsync(Guid aggregateId, string titulo, string sinopse, int paginas, string capa, int autorId, int generoId)
        {
            var livro = await _repository.GetByAsync<Livro>(aggregateId);
            if (livro.IsNull()) throw new Livro.NaoEncontradoException();

            livro.Alterar(titulo, sinopse, paginas, capa, autorId, generoId);
        }
    }
}