using System;

namespace ToDo.Infra.Core
{
    public abstract class Entity
    {
        public int Id { get; set; }
        public Guid AggregateId { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Ativo { get; set; }
    }
}
