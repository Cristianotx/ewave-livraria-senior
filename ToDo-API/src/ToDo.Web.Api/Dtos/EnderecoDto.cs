namespace ToDo.Web.Api.Dtos
{
    public class EnderecoDto
    {
        public int CidadeId { get; set; }
        
        public string Cep { get; set; }

        public string Logradouro { get; set; }

        public int Numero { get; set; }

        public string Bairro { get; set; }

        public string Complemento { get; set; }
    }
}