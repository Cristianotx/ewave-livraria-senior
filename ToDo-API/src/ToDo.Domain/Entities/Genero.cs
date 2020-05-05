using System;
using ToDo.Infra.Core;

namespace ToDo.Domain.Entities
{
    public class Genero : Entity
    {
        public string Nome { get; set; }

        public Genero()
        {

        }

        public Genero(Guid aggregateId, string nome)
        {
            AggregateId = aggregateId;
            Nome = nome;
            DataCriacao = DateTime.Now;
            Ativo = true;
        }

        public void Alterar(string nome) => Nome = nome;

        public void Ativar() => Ativo = true;

        public void Desativar() => Ativo = false;


        public class NomeObrigatorioException : BusinessException
        {
            public NomeObrigatorioException() : base("O Nome é obrigatório.") { }
        }

        public class NaoEncontradoException : BusinessException
        {
            public NaoEncontradoException() : base("O Gênero não foi encontrado.")
            {
            }

        }

        public class JaInativoException : BusinessException
        {
            public JaInativoException() : base("O Gênro já está desativado.")
            {
            }
        }

        public class JaAtivoException : BusinessException
        {
            public JaAtivoException() : base("O Gênero já está ativo.")
            {
            }
        }
    }


}