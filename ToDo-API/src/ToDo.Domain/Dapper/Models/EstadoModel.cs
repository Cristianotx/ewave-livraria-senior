using ToDo.Domain.Models;

namespace ToDo.Domain.Dapper.Models
{
    public class EstadoModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public PaisModel Pais { get; set; }
    }
}