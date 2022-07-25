# Desafio-konsi-api

###### Desafio proposto pela Konsi para desenvolvimendo de um `crawler` que retorne dados extraidos de um portal, através de uma API

#

#

Este projeto foi desenvolvido usando-se `Nodejs (versão 14.18)`, junto com a biblioteca `puppeteer (versão 15.5)`

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
	"data":
	{
		"login":"RodGom21",
		"password":"konsi2022*",
		"cpf":"18960685453"
	}
}'
```

## Futuras implementações

- **Uso de banco de dados Postgres** - para persistir histórico das consultas realizadas pelo CPF
- **Integração com WhatsApp** - Envio dos resultados via mensagem de whatsApp (link ou pdf)
