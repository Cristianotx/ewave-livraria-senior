using System.Collections.Generic;

namespace ToDo.Domain.Models
{
    public class Pais
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public virtual ICollection<Estado> Estados { get; set; } = new HashSet<Estado>();
    }
}