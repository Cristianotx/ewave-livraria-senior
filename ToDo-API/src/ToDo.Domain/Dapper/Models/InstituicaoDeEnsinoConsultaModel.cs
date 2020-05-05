using System;

namespace ToDo.Domain.Dapper.Models
{
    public class InstituicaoDeEnsinoConsultaModel
    {
        public int Id { get; set; }
        public Guid AggregateId { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public bool Ativo { get; set; }
        public int QuantidadeUsuario { get; set; }
    }
}