namespace ToDo.Domain.Dapper.Models
{
    public class EmailModel
    {
        public int Id { get; set; }
        public string Endereco { get; set; }
        public int TipoId { get; set; }
        public string Tipo { get; set; }
    }
}