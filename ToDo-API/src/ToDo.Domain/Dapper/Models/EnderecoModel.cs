namespace ToDo.Domain.Dapper.Models
{
    public class EnderecoModel
    {
        public string Cep { get; set; }
        public string Logradouro { get; set; }
        public int Numero { get; set; }
        public string Bairro { get; set; }
        public string Complemento { get; set; }
        public int CidadeId { get; set; }
        public string Cidade { get; set; }
        public int EstadoId { get; set; }
        public string Estado { get; set; }
        public string EstadoSigla { get; set; }
        public int PaisId { get; set; }
        public string Pais { get; set; }
    }
}