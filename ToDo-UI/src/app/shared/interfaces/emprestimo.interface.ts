export interface Emprestimo {
  aggregateId: string;
  id: number;
  dataEmprestimo: Date;
  dataVencimento: Date;
  livroId: number;
  livroNome: string;
  usuarioId: number;
  usuarioNome: string;
}
