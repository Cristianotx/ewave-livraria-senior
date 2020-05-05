using System.Collections.Generic;
using ToDo.Domain.Entities;
using ToDo.Infra.Core;

namespace ToDo.Domain.Models
{
    public class Usuario
    {
        public int PessoaId { get; set; }
        public string Cpf { get; set; }
        public int InstituicaoDeEnsinoId { get; set; }

        public virtual Pessoa Pessoa { get; set; }
        public virtual InstituicaoDeEnsino InstituicaoDeEnsino { get; set; }

        public virtual ICollection<Emprestimo> Emprestimos { get; set; } = new HashSet<Emprestimo>();

        public Usuario()
        {

        }

        public Usuario(string cpf, int instituicaoDeEnsinoId) : this()
        {
            Cpf = cpf;
            InstituicaoDeEnsinoId = instituicaoDeEnsinoId;
        }

        public Usuario(string cpf, int instituicaoDeEnsinoId, Pessoa pessoa) : this(cpf, instituicaoDeEnsinoId)
        {
            Pessoa = pessoa;
        }

        public void Alterar(string nome) => Pessoa.Nome = nome;
        public void Ativar() => Pessoa.Ativo = true;
        public void Desativar() => Pessoa.Ativo = false;

        public class NaoEncontradoException : BusinessException
        {
            public NaoEncontradoException() : base("O Usuário não foi encontrado") { }
        }

        public class CpfJaExisteException : BusinessException
        {
            public CpfJaExisteException() : base("O CPF informado já existe.") { }
        }

        public class JaInativoException : BusinessException
        {
            public JaInativoException() : base("O usuário já está inativo.") { }
        }

        public class JaAtivoException : BusinessException
        {
            public JaAtivoException() : base("O usuário já está ativo.") { }
        }
    }
}