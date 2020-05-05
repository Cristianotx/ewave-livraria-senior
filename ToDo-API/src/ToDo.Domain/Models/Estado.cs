using System.Collections.Generic;

namespace ToDo.Domain.Models
{
    public class Estado
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sigla { get; set; }
        public int PaisId { get; set; }
        public virtual Pais Pais { get; set; }
        public virtual ICollection<Cidade> Cidades { get; set; } = new HashSet<Cidade>();
    }
}