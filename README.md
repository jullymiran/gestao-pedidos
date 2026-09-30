# Sistema de Gestão de Pedidos - Teste Técnico AdonisJS + Angular

Aplicação de gestão de pedidos desenvolvida como teste técnico para vaga de estágio. No projeto, é possível cadastrar clientes e produtos, além de criar e acompanhar pedidos.

## Tecnologias Utilizadas

- **Backend**: AdonisJS 6
- **ORM**: Lucid
- **Banco de Dados**: SQLite
- **Frontend**: Angular

## Escolha do Banco de Dados

O documento informa que a escolha do banco de dados era livre. Logo, decidi utilizar o SQLite por conta de:
- Não ser necessário a instalação do servidor
- Facilidade de rodar o código e, consequentemente, de avaliar
- Tempo curto para produzir o projeto

## Como iniciar o projeto

É necessário ter o Node.js instalado no computador. A seguir, acompanhe algumas regras essenciais após a instalação do Node.js

### 1 - Backend

Inicie um terminal na pasta 'backend' e depois rode:

```bash
npm install
node ace migration:run
npm run dev
```

Os códigos acima são responsáveis por instalar as dependências, criar as tabelas do banco de dados e subir o servidor. A API fica disponível em 'http://localhost:3333'.

### 2 - Frontend

Inicie um segundo terminal, dessa vez na pasta 'frontend' e depois rode:

```bash
npm install
ng serve
```

Esses códigos são responsáveis por instalar as dependências do Angular e subir a aplicação. É necessário aguardar a mensagem de conclusão no terminal para prosseguir.

### 3 - Acessar o sistema

Com os dois terminais rodando ao mesmo tempo, abra o navegador em 'http://localhost:4200'. 
A tela inicial irá mostrar as três áreas do sistema: Produtos, Clientes e Pedidos.


## Modelagem de dados

- **products**: nome, preco, ativo (boolean)
- **customers**: nome, telefone
- **orders**: customer_id (FK), status, total, created_at
- **order_items**: order_id (FK), product_id (FK), quantidade, preco_unitario, total item.

'order_items' é responsável por armazenar seu próprio 'preco_unitario', separado do 'preco' em 'products', uma vez que o preço do produto no momento da criação do pedido é copiado para o item.

## Endpoints principais

| Método | Rota | Descrição |
|---|---|---|
| GET | /products | Lista produtos |
| POST | /products | Cria produto |
| GET | /products/:id | Busca produto |
| PUT | /products/:id | Edita produto (inclui ativar/desativar) |
| GET | /customers | Lista clientes |
| POST | /customers | Cria cliente |
| GET | /customers/:id | Busca cliente |
| PUT | /customers/:id | Edita cliente |
| GET | /orders | Lista pedidos |
| POST | /orders | Cria pedido |
| GET | /orders/:id | Busca um pedido (com itens) |
| PUT | /orders/:id/status | Altera status do pedido |

## Regras de negócio implementadas

- Um pedido só pode ser criado com um cliente válido.
- Um pedido precisa ter pelo menos um produto.
- A quantidade mínima de cada item é 1.
- Produtos inativos não podem ser adicionados a novos pedidos.
- O valor total do pedido é calculado pelo backend, nunca recebido pronto do frontend.
- O preço do produto é copiado para o item no momento da criação do pedido.
- O status do pedido segue o fluxo pendente: Pendente, Em preparação, Pronto e Finalizado (exceto a partir de Finalizado ou Cancelado).
- Um pedido cancelado ou finalizado não pode mudar de status novamente.

## Futuras implementações

Devido ao curto prazo de entrega, alguns adicionais no código ficaram pendentes. São eles:
- **Máscara no campo de telefone**
- **Validação de campos no frontend (atualmente só possui no backend)**
- **Estilização com CSS**
- **Exibir nome do cliente no pedido (atualmente a lista de pedidos permite visualizar apenas o id do cliente, e não o nome)**

## Observações

Este foi meu primeiro contato com AdonisJS, Lucid e Angular. Por conta disso, utilizei vídeos, documentação oficial e auxilio de ia (claude) para ajudar na compreensão de conceitos e para tirar dúvidas. O código foi escrito, testado e compreendido por mim mesma.
