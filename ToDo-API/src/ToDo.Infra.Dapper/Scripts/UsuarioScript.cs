namespace ToDo.Infra.Dapper.Scripts
{
    public struct UsuarioScript
    {
        public const string Paginada = @"
        ;WITH [ie] AS 
        (
	        SELECT
		        [p].[Id],
		        [p].[AggregateId],
		        [p].[Nome],
		        [u].[Cpf],
		        [p].[Ativo],
		        ISNULL(
		        (
			        SELECT 
				        COUNT([e].[Id])
			        FROM [dbo].[Emprestimo] AS [e]
			        WHERE [e].[PessoaId] = [p].[Id]
			        AND [e].[DataDevolucao] IS NULL
		        ), 0) AS [QuantidadeEmprestimo],
		        ROW_NUMBER() OVER(ORDER BY [p].[Nome]) AS [Row]
	        FROM [dbo].[Usuario] AS [u]
	        INNER JOIN [dbo].[Pessoa] AS [p] ON [p].[Id] = [u].[PessoaId]
        ) SELECT 
           [ie].[Id],
           [ie].[AggregateId],
           [ie].[Nome],
           [ie].[Cpf],
           [ie].[Ativo],
           [ie].[QuantidadeEmprestimo]
         FROM [ie]
        WHERE 
            [ie].[Row] > (@PageSize * (@PageNumber - 1)) 
            AND [ie].[Row] <= (@PageSize * @PageNumber)
        ORDER BY [ie].[Row]";

        public const string Query = @"
        SELECT
	        [p].[AggregateId],
	        [p].[Id],
	        [p].[Nome],
	        [u].[Cpf],
	        [p].[Ativo]
        FROM [dbo].[Usuario] AS [u]
        INNER JOIN [dbo].[Pessoa] AS [p] ON [p].[Id] = [u].[PessoaId]
        {0}";
    }
}