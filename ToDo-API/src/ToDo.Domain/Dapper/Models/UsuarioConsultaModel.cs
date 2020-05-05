using System;

namespace ToDo.Domain.Dapper.Models
{
    public class UsuarioConsultaModel
    {
        public int Id { get; set; }
        public Guid AggregateId { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public bool Ativo { get; set; }
        public int QuantidadeEmprestimo { get; set; }
    }
}