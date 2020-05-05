namespace ToDo.Domain.Dapper.Models
{
    public class CidadeModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public EstadoModel Estado { get; set; }
    }
}