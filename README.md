# Pagamentos PicPay

Este repositório contém uma proposta de projeto para consumo da API do PicPay. É dividido em uma API Java e uma aplicação cliente construída usando React.

## Principais tecnologias

* [Spring Boot](https://spring.io/projects/spring-boot)
* [Spring WebSocket](https://docs.spring.io/spring-framework/docs/5.0.0.BUILD-SNAPSHOT/spring-framework-reference/html/websocket.html)
* [Lombok](https://projectlombok.org/)
* [Maven](http://maven.apache.org/)
* [React](https://pt-br.reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Redux](https://redux.js.org/)
* [React Redux](https://react-redux.js.org/)
* [Axios](https://github.com/axios/axios)

## Execução

Primeiramente, deve-se baixar o repositório em algum diretório físico do computador.

## Pré-requisitos
* [Maven](http://maven.apache.org/)
* [Node](https://nodejs.org/en/)

### Execução - API

Antes de subir a aplicação, é necessário configurar os parâmetros do arquivo *application.properties*. Após isso, acessar a pasta *picpay-server* via terminal e digitar o comando:
```
  mvn clean package
```
para que o arquivo **.jar** da API seja gerado. Na sequência, executar o comando para rodar a aplicação (*java -jar target\NOME-APLICACAO.jar*).

### Execução - Client

Antes de subir a aplicação, é necessário editar o arquivo *api.js* informando a URL na qual o servidor está rodando. Depois, via terminal, deve-se acessar a pasta *picpay-client* e executar
```
npm install
``` 
para que todas as dependências do projeto sejam baixadas. Após isso, rodar
``` 
npm start 
```
e a aplicação cliente será aberta.
