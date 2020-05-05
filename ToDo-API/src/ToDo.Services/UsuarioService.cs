using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.Domain.Entities;
using ToDo.Domain.Enums;
using ToDo.Domain.Models;
using ToDo.Domain.Repositories;
using ToDo.Domain.Services;
using ToDo.Infra.Extensions;

namespace ToDo.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IInstituicaoDeEnsinoRepository _instituicaoDeEnsinoRepository;
        private readonly IUsuarioRepository _repository;

        public UsuarioService(IUsuarioRepository usuarioRepository, IInstituicaoDeEnsinoRepository instituicaoDeEnsinoRepository)
        {
            _repository = usuarioRepository;
            _instituicaoDeEnsinoRepository = instituicaoDeEnsinoRepository;
        }

        public async Task CriarAsync(Guid aggregateId, string nome, string cpf, int instituicaoDeEnsinoId, int cidadeId, string cep, string logradouro, int numero, string bairro, string complemento, List<Tuple<int, string>> telefones, List<Tuple<int, string>> emails)
        {
            var instituicao = await _instituicaoDeEnsinoRepository.ObterPorAsync(instituicaoDeEnsinoId);
            if (instituicao.IsNull()) throw new InstituicaoDeEnsino.NaoEncontradaException();

            var endereco = new Endereco(cidadeId, cep, logradouro, numero, bairro, complemento);
            var pessoa = new Pessoa(aggregateId, nome, EPessoaTipo.PessoaFisica, endereco);
            var usuario = new Usuario(cpf, instituicaoDeEnsinoId, pessoa);

            foreach (var (tipoId, telefone) in telefones) 
                pessoa.Telefones.Add(new Telefone((ETelefoneTipo)tipoId, telefone));

            foreach (var (tipoId, email) in emails) 
                pessoa.Emails.Add(new Email((EEmailTipo)tipoId, email));
            
            await _repository.CriarAsync(usuario);
        }

        public async Task AlterarAsync(Guid aggregateId, string nome, string cpf)
        {
            var usuario = await _repository.ObterPorAsync(cpf);
            if (!usuario.IsNull() && usuario.Pessoa.AggregateId != aggregateId) throw new Usuario.CpfJaExisteException();

            usuario = await _repository.ObterPorAsync(aggregateId);
            if (usuario.IsNull()) throw new Usuario.NaoEncontradoException();

            usuario.Pessoa.Nome = nome;
            usuario.Cpf = cpf;
        }

        public async Task AtivarAsync(Guid aggregateId)
        {
            var usuario = await _repository.ObterPorAsync(aggregateId);
            if (usuario.IsNull()) throw new Usuario.NaoEncontradoException();
            if (usuario.Pessoa.Ativo) throw new Usuario.JaAtivoException();

            usuario.Ativar();
        }

        public async Task DesativarAsync(Guid aggregateId)
        {
            var usuario = await _repository.ObterPorAsync(aggregateId);
            if (usuario.IsNull()) throw new Usuario.NaoEncontradoException();
            if (usuario.Pessoa.Ativo.IsFalse()) throw new Usuario.JaInativoException();

            usuario.Desativar();
        }
    }
}