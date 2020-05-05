namespace ToDo.Infra.Dapper.Scripts
{
    public struct PessoaScript
    {
		public const string Endereco = @"
        SELECT 
	        [e].[Cep],
	        [e].[Logradouro],
	        [e].[Numero],
	        [e].[Bairro],
	        [e].[Complemento],
	        [c].[Id] AS [CidadeId],
	        [c].[Nome] AS [Cidade],
	        [e2].[Id] AS [EstadoId],
	        [e2].[Nome] AS [Estado],
	        [e2].[Sigla] AS [EstadoSigla],
	        [p2].[Id] AS [PaisId],
	        [p2].[Nome] AS [Pais]
        FROM [dbo].[Endereco] AS [e]
        INNER JOIN [dbo].[Pessoa] AS [p] ON [p].[Id] = [e].[PessoaId]
        INNER JOIN [dbo].[Cidade] AS [c] ON [c].[Id] = [e].[CidadeId]
        INNER JOIN [dbo].[Estado] AS [e2] ON [e2].[Id] = [c].[EstadoId]
        INNER JOIN [dbo].[Pais] AS [p2] ON [p2].[Id] = [e2].[PaisId]
        {0}";

        public const string Telefones = @"
        SELECT 
	        [t].[Id],
	        [t].[Numero],
	        [tt].[Id] AS [TipoId],
	        [tt].[Nome] AS [Tipo]
        FROM [dbo].[Telefone] AS [t]
        INNER JOIN [dbo].[TelefoneTipo] AS [tt] ON [tt].[Id] = [t].[PessoaId]
        INNER JOIN [dbo].[Pessoa] AS [p] ON [p].[Id] = [t].[PessoaId]
        {0}";
		
        public const string Emails = @"
        SELECT
	        [e].[Id],
	        [e].[Endereco],
	        [et].[Id] AS [TipoId],
	        [et].[Nome] AS [Tipo]
        FROM [dbo].[Email] AS [e]
        INNER JOIN [dbo].[EmailTipo] AS [et] ON [et].[Id] = [e].[PessoaId]
        INNER JOIN [dbo].[Pessoa] AS [p] ON [p].[Id] = [e].[PessoaId]
        {0}";
	}
}