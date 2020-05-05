using System;
using ToDo.Domain.Entities;
using ToDo.Infra.Core;

namespace ToDo.Domain.Models
{
    public class Emprestimo
    {
        public int Id { get; set; }
        public DateTime DataEmprestimo { get; set; }
        public DateTime DataVencimento { get; set; }
        public DateTime? DataDevolucao { get; set; }

        public int LivroId { get; set; }
        public virtual Livro Livro { get; set; }

        public int PessoaId { get; set; }
        public virtual Usuario Usuario { get; set; }

        public Emprestimo()
        {
            
        }

        public Emprestimo( DateTime dataEmprestimo, DateTime dataVencimento, int livroId, int pessoaId)
        {
            DataEmprestimo = dataEmprestimo;
            DataVencimento = dataVencimento;
            LivroId = livroId;
            PessoaId = pessoaId;
        }

        public class NaoEncontradoException : BusinessException
        {
            public NaoEncontradoException() : base("Não existe o empréstimo.") { }
        }

        public class LivroEmVigenciaException : BusinessException
        {
            public LivroEmVigenciaException() : base("O Livro já está emprestado ao Usuário.") { }
        }


        public class LimiteExcedidoException : BusinessException
        {
            public LimiteExcedidoException(int limite) : base($"O Usuário está no limite máximo de {limite} emprestimos em vigência.") { }
        }
    }
}