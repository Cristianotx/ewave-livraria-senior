using System;

namespace ToDo.Domain.Dapper.Models
{
    public class GeneroModel
    {
        public Guid AggregateId { get; set; }
        public int Id { get; set; }
        public string Nome { get; set; }
        public bool Ativo { get; set; }
    }
}