# Desafio-konsi-api

###### Desafio proposto pela Konsi para desenvolvimendo de um `crawler` que retorne dados extraidos de um portal, através de uma API

#

#

Este projeto foi desenvolvido usando-se `Nodejs/Typescript (versão 14.18)`, junto com a biblioteca `puppeteer (versão 15.5)`

### Justificativa

Considerando que esta é a primeira oportunidade de adquirir conhecimento e desenvolver algo como scrapping ou crawler, iniciei a pesquisa por bibliotecas que podessem facilitar no desenvolvimento.
Foram encontradas, além da `puppeteer`, as bibliotecas: `JSDom, Cheerio, PlayWright`
A biblioteca `puppeteer` foi a escolhida por razão de ser a que oferece maior suporte (documentação, exemplos, facilidade de uso).

### Estrutura base

Foi utilizada uma estrutura de pastas base, comum a todos os projetos que inicio, levando-se em conta design pattern bem como boas práticas de clean code.

No arquivo `package.json` vão existir alguns pacotes/bibliotecas que não foram utilizados neste projeto. Embora esta prática não é de costume adotar, mas que em virtude de ter que dar celeridade que se precisava dar a este, de antemão peço que desconsidere esta prática.

### Instruções

Para fazê-lo funcionar, basta baixar o projeto deste repositório.
Em seguida, baixar todos os pacotes utilizados no projeto, digitando uma das seguintes linhas de comando:

**Com NPM**

```sh
npm i
```

**Com yarn**

```sh
yarn
```

Após finalizar o processo, para executar o projeto bastar executar a seguinte linha de comando:

**Com NPM**

```sh
npm api:server
```

**Com yarn**

```sh
yarn api:server
```

Após este procedimento, o servidor Rest estará ativo na **porta 3333**.

#

## Requisições

Para conseguir realizar uma consulta, é necessário que se faça uma requisição do tipo `POST` ao seguinte endereço:

> `localhost:3333/crawlers/newResearch` com o seguinte conteúdo (Body) em **JSON**:

```json
{
  "data": {
    "login": "xxxxxxxxx",
    "password": "XxYzzzSSS11**",
    "cpf": "ZZZZZZZZZZZ"
  }
}
```

##### Versão `cUrl`:

#

```console
curl --request POST \
  --url http://localhost:3333/crawlers/newResearch \
  --header 'Content-Type: application/json' \
  --data '{
	{
  "data": {
    "login": "xxxxxxxxx",
    "password": "XxYzzzSSS11**",
    "cpf": "ZZZZZZZZZZZ"
  }
}'
```

## Futuras implementações

- **Uso de banco de dados Postgres** - para persistir histórico das consultas realizadas pelo CPF
- **Integração com WhatsApp** - Envio dos resultados via mensagem de whatsApp (link ou pdf)
