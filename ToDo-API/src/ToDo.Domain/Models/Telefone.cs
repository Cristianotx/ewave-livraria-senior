using ToDo.Domain.Entities;
using ToDo.Domain.Enums;
using ToDo.Infra.Core;

namespace ToDo.Domain.Models
{
    public class Telefone
    {
        public int Id { get; set; }
        public string Numero { get; set; }

        public int TipoId { get; set; }
        public virtual TelefoneTipo Tipo { get; set; }

        public int PessoaId { get; set; }
        public virtual Pessoa Pessoa { get; set; }

        public Telefone()
        {
            
        }

        public Telefone(ETelefoneTipo tipo, string numero)
        {
            TipoId = (int)tipo;
            Numero = numero;
        }
        
        public void Alterar(ETelefoneTipo tipo, string numero)
        {
            TipoId = (int)tipo;
            Numero = numero;
        }

        public class JaExisteException : BusinessException
        {
            public JaExisteException() : base("O Número de telefone já está adicionado.") {  }
        }

        public class NaoExisteException : BusinessException
        {
            public NaoExisteException() : base("O Telefone não existe.") { }
        }
    }
}