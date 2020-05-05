namespace ToDo.Domain.Dapper.Models
{
    public class TelefoneModel
    {
        public int Id { get; set; }
        public string Numero { get; set; }
        public int TipoId { get; set; }
        public string Tipo { get; set; }
    }
}