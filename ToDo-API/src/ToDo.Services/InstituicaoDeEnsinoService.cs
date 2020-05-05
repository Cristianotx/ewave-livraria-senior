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
    public class InstituicaoDeEnsinoService : IInstuicaoDeEnsinoService
    {
        private readonly IInstituicaoDeEnsinoRepository _repository;

        public InstituicaoDeEnsinoService(IInstituicaoDeEnsinoRepository repository)
        {
            _repository = repository;
        }

        public async Task CriarAsync(Guid aggregateId, string nome, string cnpj, int cidadeId, string cep, string logradouro, int numero, string bairro, string complemento, List<Tuple<int, string>> telefones, List<Tuple<int, string>> emails)
        {
            if (nome.IsNullOrWhiteSpace()) throw new InstituicaoDeEnsino.NomeObrigatorioException();
            if (cnpj.IsNullOrWhiteSpace()) throw new InstituicaoDeEnsino.CnpjObrigatorioException();

            var endereco = new Endereco(cidadeId, cep, logradouro, numero, bairro, complemento);
            var pessoa = new Pessoa(aggregateId, nome, EPessoaTipo.PessoaJuridica, endereco);
            var instituicaoDeEnsino = new InstituicaoDeEnsino(cnpj, pessoa);

            foreach (var (tipoId, telefone) in telefones)
                pessoa.Telefones.Add(new Telefone((ETelefoneTipo)tipoId, telefone));

            foreach (var (tipoId, email) in emails)
                pessoa.Emails.Add(new Email((EEmailTipo)tipoId, email));

            await _repository.CriarAsync(instituicaoDeEnsino);
        }

        public async Task AlterarAsync(Guid aggregateId, string nome, string cnpj)
        {
            if (nome.IsNullOrWhiteSpace()) throw new InstituicaoDeEnsino.NomeObrigatorioException();
            if (cnpj.IsNullOrWhiteSpace()) throw new InstituicaoDeEnsino.CnpjObrigatorioException();

            var instituicao = await _repository.ObterPorAsync(cnpj);
            if (instituicao.IsNotNull() && instituicao.Pessoa.AggregateId != aggregateId) throw new InstituicaoDeEnsino.CnpjJaExisteException();

            instituicao = await _repository.ObterPorAsync(aggregateId);
            if (instituicao.IsNull()) throw new InstituicaoDeEnsino.NaoEncontradaException();

            instituicao.Cnpj = cnpj;
            instituicao.Pessoa.Nome = nome;
        }

        public async Task AtivarAsync(Guid aggregateId)
        {
            var instituicao = await _repository.ObterPorAsync(aggregateId);
            if (instituicao.IsNull()) throw new InstituicaoDeEnsino.NaoEncontradaException();
            if (instituicao.Pessoa.Ativo) throw new InstituicaoDeEnsino.JaAtivoException();

            instituicao.Ativar();
        }

        public async Task DesativarAsync(Guid aggregateId)
        {
            var instituicao = await _repository.ObterPorAsync(aggregateId);
            if (instituicao.IsNull()) throw new InstituicaoDeEnsino.NaoEncontradaException();
            if (instituicao.Pessoa.Ativo.IsFalse()) throw new InstituicaoDeEnsino.JaInativoException();

            instituicao.Desativar();
        }
    }
}