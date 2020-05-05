using System;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Domain.Entities;
using ToDo.Domain.Models;
using ToDo.Domain.Repositories;
using ToDo.Domain.Services;
using ToDo.Infra.Core;
using ToDo.Infra.Extensions;

namespace ToDo.Services
{
    public class EmprestimoService : IEmprestimoService
    {
        private readonly IEmprestimoRepository _emprestimoRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IRepository _repository;

        private const int LIMITE_PARA_EMPRESTIMO = 2;

        public EmprestimoService(IEmprestimoRepository emprestimoRepository, IUsuarioRepository usuarioRepository, IRepository repository)
        {
            _emprestimoRepository = emprestimoRepository;
            _usuarioRepository = usuarioRepository;
            _repository = repository;
        }


        public async Task CriarAsync(DateTime dataEmprestimo, DateTime dataVencimento, int livroId, int pessoaId)
        {
            var usuario = await _usuarioRepository.ObterPorAsync(pessoaId);
            if (usuario.IsNull()) throw new Usuario.NaoEncontradoException();

            //VERIFICAR SE USUARIO ESTA HAPTO A EMPRESTAR LIVRO

            //NÃO INCLUIR EMPRESTIMO ENCERRADO
            if (usuario.Emprestimos.Any(e => e.LivroId == livroId))
                throw new Emprestimo.LivroEmVigenciaException();
            
            if (usuario.Emprestimos.Count >= LIMITE_PARA_EMPRESTIMO)
                throw new Emprestimo.LimiteExcedidoException(LIMITE_PARA_EMPRESTIMO);

            var livro = await _repository.GetByAsync<Livro>(livroId);
            if (livro.IsNull()) throw new Livro.NaoEncontradoException();
            
            if (livro.Disponivel.IsFalse()) throw new Livro.IndisponivelException();

            livro.Indisponibilizar();
            await _emprestimoRepository.CriarAsync(dataEmprestimo, dataVencimento, livroId, pessoaId);
        }

        public async Task DevolverAsync(int id)
        {
            var emprestimo = await _emprestimoRepository.ObterPorAsync(id);
            if (emprestimo.IsNull()) throw new Emprestimo.NaoEncontradoException();

            emprestimo.DataDevolucao = DateTime.Now;
            emprestimo.Livro.Disponibilizar();
        }
    }
}