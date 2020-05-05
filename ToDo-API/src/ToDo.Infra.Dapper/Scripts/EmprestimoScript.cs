namespace ToDo.Infra.Dapper.Scripts
{
    public struct EmprestimoScript
    {
        public static string Paginada = @"
        ;WITH [ie] AS 
        (
	        SELECT 
		        [e].[Id],
		        [e].[DataEmprestimo],
		        [e].[DataVencimento],
		        [l].[Id] AS [LivroId],
		        [l].[Titulo] AS [LivroTitulo],
		        [p].[Id] AS [PessoaId],
		        [p].[Nome] AS [PessoaNome],
	        ROW_NUMBER() OVER(ORDER BY [e].[DataEmprestimo]) AS [Row]
	        FROM [dbo].[Emprestimo] AS [e]
	        INNER JOIN [dbo].[Livro] AS [l] ON [l].[Id] = [e].[LivroId]
	        INNER JOIN [dbo].[Usuario] AS [u] ON [u].[PessoaId] = [e].[PessoaId]		
	        INNER JOIN [dbo].[Pessoa] AS [p] ON [p].[Id] = [u].[PessoaId]
	        WHERE [e].[DataDevolucao] IS NULL
        ) SELECT 
           [ie].[Id],
           [ie].[DataEmprestimo],
           [ie].[DataVencimento],
           [ie].[LivroId] ,
           [ie].[LivroTitulo],
           [ie].[LivroTitulo],
           [ie].[PessoaId],
           [ie].[PessoaNome]
         FROM [ie]
        WHERE 
            [ie].[Row] > (@PageSize * (@PageNumber - 1)) 
            AND [ie].[Row] <= (@PageSize * @PageNumber)
        ORDER BY [ie].[Row]";
    }
}