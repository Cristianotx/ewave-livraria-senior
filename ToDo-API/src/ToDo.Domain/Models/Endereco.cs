using ToDo.Domain.Entities;

namespace ToDo.Domain.Models
{
    public class Endereco
    {
        public int PessoaId { get; set; }
        public string Cep { get; set; }
        public string Logradouro { get; set; }
        public int Numero  { get; set; }
        public string Bairro { get; set; }
        public string Complemento { get; set; }

        public int CidadeId { get; set; }
        public virtual Cidade Cidade { get; set; }
        
        public virtual Pessoa Pessoa { get; set; }

        public Endereco()
        {
            
        }

        public Endereco(int cidadeId, string cep, string logradouro, int numero, string bairro, string complemento)
        {
            CidadeId = cidadeId;
            Cep = cep;
            Logradouro = logradouro;
            Numero = numero;
            Bairro = bairro;
            Complemento = complemento;
        }

        public void Alterar(in int cidadeId, string cep, string logradouro, in int numero, string bairro, string complemento)
        {
            CidadeId = cidadeId;
            Cep = cep;
            Logradouro = logradouro;
            Numero = numero;
            Bairro = bairro;
            Complemento = complemento;
        }
    }
}