namespace ToDo.Infra.Dapper.Scripts
{
    public struct InstituicaoDeEnsinoScript
    {
        public const string Paginada = @"
        ;WITH [ie] AS 
        (
            SELECT 
	            [p].[Id],
	            [p].[AggregateId],
	            [p].[Nome],
	            [ide].[Cnpj],
	            [p].[Ativo],
	            ISNULL(
	            (
		            SELECT 
			            COUNT([u].[PessoaId])
		            FROM [dbo].[Usuario] AS [u]
		            WHERE [u].[InstituicaoDeEnsinoId] = [p].[Id]

	            ), 0) AS [QuantidadeUsuario],
                ROW_NUMBER() OVER(ORDER BY [p].[Nome]) AS [Row]
            FROM [dbo].[InstituicaoDeEnsino] AS [ide]
            INNER JOIN [dbo].[Pessoa] AS [p] ON [p].[Id] = [ide].[PessoaId]
        ) SELECT 
	        [ie].[Id],
	        [ie].[AggregateId],
	        [ie].[Nome],
	        [ie].[Cnpj],
	        [ie].[Ativo],
	        [ie].[QuantidadeUsuario]
        FROM [ie]
        WHERE 
            [ie].[Row] > (@PageSize * (@PageNumber - 1)) 
            AND [ie].[Row] <= (@PageSize * @PageNumber)
        ORDER BY [ie].[Row]";

        public const string Query = @"
        SELECT 
	        [p].[Id],
	        [p].[AggregateId],
	        [p].[Nome],
	        [ide].[Cnpj],
	        [p].[Ativo]
        FROM [dbo].[InstituicaoDeEnsino] AS [ide]
        INNER JOIN [dbo].[Pessoa] AS [p] ON [p].[Id] = [ide].[PessoaId]
        {0}";

    }
}