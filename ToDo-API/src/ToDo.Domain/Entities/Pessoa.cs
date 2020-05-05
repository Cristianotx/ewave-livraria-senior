using System;
using System.Collections.Generic;
using System.Linq;
using ToDo.Domain.Enums;
using ToDo.Domain.Models;
using ToDo.Infra.Core;

namespace ToDo.Domain.Entities
{
    public class Pessoa : Entity
    {
        public string Nome { get; set; }
        public int TipoId { get; set; }
        public virtual PessoaTipo Tipo { get; set; }

        public virtual Endereco Endereco { get; set; }

        public virtual ICollection<Email> Emails { get; set; } = new HashSet<Email>();
        public virtual ICollection<Telefone> Telefones { get; set; } = new List<Telefone>();

        public Pessoa()
        {

        }

        public Pessoa(Guid aggregateId, string nome, EPessoaTipo tipo) : this()
        {
            AggregateId = aggregateId;
            Nome = nome;
            TipoId = (int)tipo;
            DataCriacao = DateTime.Now;
            Ativo = true;
        }

        public Pessoa(Guid aggregateId, string nome, EPessoaTipo tipo, Endereco endereco) : this(aggregateId, nome, tipo)
        {
            Endereco = endereco;
        }

        public void AdicionarTelefone(ETelefoneTipo tipo, string numero)
        {
            if (Telefones.Any(t => t.Numero == numero)) throw new Telefone.JaExisteException();
            Telefones.Add(new Telefone(tipo, numero));
        }

        public void AdicionarEmail(EEmailTipo tipo, string endereco)
        {
            if (Emails.Any(e => e.Endereco == endereco)) throw new Email.JaExisteException();
            Emails.Add(new Email(tipo, endereco));
        }


        public class NaoEncontradaException : BusinessException
        {
            public NaoEncontradaException() : base("A pessoa não foi encontrada.") { }
        }
    }
}
