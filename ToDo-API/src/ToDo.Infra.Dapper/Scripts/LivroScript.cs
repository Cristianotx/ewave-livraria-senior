namespace ToDo.Infra.Dapper.Scripts
{
    public struct LivroScript
    {
		public const string Paginada = @"
        ;WITH [l] AS 
        (
	        SELECT 
		        [l].[Id],
		        [l].[AggregateId],
		        [l].[Titulo],
		        [l].[Capa],
		        [l].[Ativo],
		        [l].[Disponivel],
		        ROW_NUMBER() OVER(ORDER BY [l].[Titulo]) AS [Row]
	        FROM [dbo].[Livro] AS [l]
        ) SELECT 
	        [l].[Id],
	        [l].[AggregateId],
	        [l].[Titulo],
	        [l].[Capa],
	        [l].[Ativo],
	        [l].[Disponivel]
        FROM [l]
        WHERE 
            [l].[Row] > (@PageSize * (@PageNumber - 1)) 
            AND [l].[Row] <= (@PageSize * @PageNumber)
        ORDER BY [l].[Row]";


        public const string Query = @"
        SELECT 
	        [l].[AggregateId],
	        [l].[Id],
	        [l].[Titulo],
	        [l].[Sinopse],
	        [l].[Paginas],
	        [l].[Capa],
	        [l].[Disponivel],
	        [l].[DataCriacao],
	        [l].[Ativo],
	        [a].[Id] AS [AutorId],
	        [a].[Nome] AS [Autor],
	        [g].[Id] AS [GeneroId],
	        [g].[Nome] AS [Genero]
        FROM [dbo].[Livro] AS [l]
        INNER JOIN [dbo].[Autor] AS [a] ON [a].[Id] = [l].[AutorId]
        INNER JOIN [dbo].[Genero] AS [g] ON  [g].[Id] = [l].[GeneroId]
        {0}";
    }
}