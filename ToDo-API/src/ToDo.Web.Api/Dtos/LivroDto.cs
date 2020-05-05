namespace ToDo.Web.Api.Dtos
{
    public class LivroDto
    {
        public string Titulo { get; set; }
        public string Sinopse { get; set; }
        public int Paginas { get; set; }
        public string Capa { get; set; }
        public int AutorId { get; set; }
        public int GeneroId { get; set; }
    }
}