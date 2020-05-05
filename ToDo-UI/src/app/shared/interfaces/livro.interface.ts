export interface Livro {
  id: number;
  aggregateId: string;
  titulo: string;
  capa: string;
  sinopse: string;
  paginas: number;
  ativo: boolean;
  dataCriacao: Date;
  disponivel: boolean;
  autorId: number;
  generoId: number;
}
