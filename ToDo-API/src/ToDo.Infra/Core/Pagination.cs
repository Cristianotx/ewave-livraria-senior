namespace ToDo.Infra.Core
{
    public class Pagination
    {
        public int PageSize { get; set; } = 12;
        public int PageNumber { get; set; } = 1;

        public static readonly Pagination Padrao = new Pagination();

        public Pagination GetPagination() => this;
    }
}