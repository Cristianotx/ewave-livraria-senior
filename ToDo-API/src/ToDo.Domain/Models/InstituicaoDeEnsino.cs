using System;
using ToDo.Domain.Entities;
using ToDo.Domain.Enums;
using ToDo.Infra.Core;

namespace ToDo.Domain.Models
{
    public class InstituicaoDeEnsino
    {
        public int PessoaId { get; set; }
        public string Cnpj { get; set; }
        public virtual Pessoa Pessoa { get; set; }

        public InstituicaoDeEnsino()
        {

        }

        public InstituicaoDeEnsino(string cnpj, Pessoa pessoa) : this()
        {
            Cnpj = cnpj;
            Pessoa = pessoa;
        }
        
        public void Ativar() => Pessoa.Ativo = true;

        public void Desativar() => Pessoa.Ativo = false;

        public class NaoEncontradaException : BusinessException
        {
            public NaoEncontradaException() : base("A Instituição de ensino não foi encontrada.") { }
        }

        public class NomeObrigatorioException : BusinessException
        {
            public NomeObrigatorioException() : base("O Nome é obrigatório.") { }
        }

        public class CnpjJaExisteException : BusinessException
        {
            public CnpjJaExisteException() : base("O CNPJ informado já existe.") { }
        }

        public class CnpjObrigatorioException : BusinessException
        {
            public CnpjObrigatorioException() : base("O CNPJ é obrigatório.") { }
        }
        public class JaInativoException : BusinessException
        {
            public JaInativoException() : base("A Instituição de ensino já está inativa.") { }
        }

        public class JaAtivoException : BusinessException
        {
            public JaAtivoException() : base("A Instituição de ensino já está ativa.") { }
        }
    }
}
