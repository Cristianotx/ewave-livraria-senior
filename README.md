# Processo Seletivo Sênior - Ewave

![](https://cdn.discordapp.com/attachments/690572177598316544/706954741531541586/logo.png)

Prova de conceito para gerênciar empréstimos de livros da editora "To do". 

------------

## Principais Funcionalidades

- #### Livro
    Composto por Autor e Gênero é um dos principais modelo do domínio se relacionam  para permitir mais detalhe das informações.
- #### Empréstimo
    Controle de saída e devolução do(s) livro(s) e disponibilização para serem realocados novamente.
- #### Instituição de Ensino
    Responsável por realizar o controle dos livros, empréstimos, criação, alteração e exclução bem como a ativação/intivação de cadastros.
- #### Usuario
    Relaliza empréstimos e devoluções.

## Executando o Projeto

- Para executar o projeto, você precisará ter o [docker](https://app.dbdesigner.net/signup "docker") instalado. Um software de contêiner que fornece uma camada de abstração e automação para virtualização de sistemas operacionais windowns e linux. Nosso caso estamos utilizando o linux.
- Certifique-se também que as portas `5555`, `64978` e `1433` estão liberadas.

#### Abra o terminal, entre na raiz do projeto e execute o comando:

`docker-compose up --build`

após a finalização do build, o link poderá ser acessado clicando [aqui](http://localhost:5555/ "aqui").

## Tecnologias usadas no projeto

### Front-end

- Angular 9
- RxJS
- Ngrx (Gerenciamento de estado)
- Ngx-bootstrap
- Firebase

### Back-end

- .Net Core 3.1
- Swagger (Documentação iterativa para API REST)
- DDD
- EntityFramework
- Dapper
- UnitOfWork pattern
- Repository pattern
- Service pattern

### Banco de dados

- SQL
- DBDesigner ([Modelagem](https://app.dbdesigner.net/designer/schema/0-untitled-79eb30ad-1167-4cdb-b788-241dababf7c6 "Modelagem"))

## Features a serem implementadas

### Funcionalidades

- Reservar livros.
- Cancelamento de reservas de livros.
- Notificar instituição ao encerrar a vigência de um livro emprestado.
- Dashboard.
- Enviar email quando disponibilizar um livro ao usuário que o reservou.
- Comunicação em tempo real.

### Frond-end

- Testes de unidade.
- Modo escuro.
- Melhoria na UX.

### Back-end

- Testes de unidade.
- CQRS.
- Hangfire.
- Envio de email.