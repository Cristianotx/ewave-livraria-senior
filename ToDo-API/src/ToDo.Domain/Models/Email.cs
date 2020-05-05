using ToDo.Domain.Entities;
using ToDo.Domain.Enums;
using ToDo.Infra.Core;

namespace ToDo.Domain.Models
{
    public class Email
    {
        public int Id { get; set; }
        public string Endereco { get; set; }

        public int TipoId { get; set; }
        public virtual EmailTipo Tipo { get; set; }

        public int PessoaId { get; set; }
        public virtual Pessoa Pessoa { get; set; }

        public Email()
        {
            
        }

        public Email(EEmailTipo tipo, string endereco)
        {
            TipoId = (int)tipo;
            Endereco = endereco;
        }

        public void Alterar(EEmailTipo tipo, string endereco)
        {
            TipoId = (int)tipo;
            Endereco = endereco;
        }

        public class JaExisteException : BusinessException
        {
            public JaExisteException() : base("O Endereço já está adicionado.") { }
        }

        public class NaoExisteException : BusinessException
        {
            public NaoExisteException() : base("O Email nao existe.") { }
        }
    }
}