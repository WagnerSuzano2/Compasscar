# CompassCar API

## Descrição

A **CompassCar API** é uma aplicação backend desenvolvida para gerenciar a locação de veículos. A API permite realizar operações de **CRUD** (Create, Read, Update, Delete) para gerenciar os veículos disponíveis para aluguel, sem o uso de frameworks externos, utilizando apenas **Node.js** e **MySQL**.

## Funcionalidades

- **Cadastrar veículos**: Adicionar novos carros com informações como modelo, marca, ano e disponibilidade.
- **Listar veículos**: Visualizar todos os carros disponíveis no sistema.
- **Atualizar informações de veículos**: Editar os dados de um carro, incluindo disponibilidade.
- **Remover veículos**: Excluir um carro do sistema.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para construção da API.
- **MySQL**: Banco de dados relacional para armazenar as informações dos veículos.
- **Módulos nativos do Node.js**: Desenvolvido sem o uso de frameworks como Express ou ORM.

## Pré-requisitos

- **Node.js** instalado
- **MySQL** configurado

## Instalação e Execução

**Clonar o Repositório**

**Copiar código chave SSH**:

git clone git@github.com:WagnerSuzano2/Compasscar.git

## Pré-Instalar Dependências

**npm install**

## Configurar Variáveis de Ambiente

Renomeie o arquivo **.env.example** para **.env** e configure as variáveis necessárias (credenciais do banco de dados, porta, etc).

## Configurar Banco de Dados

Crie o banco de dados compasscar no MySQL.

Execute o arquivo **dump.sql** fornecidos para criar o banco e as tabelas cars e cars_items.

## Executar a Aplicação

**npm start**

## Testar a API

**Utilize ferramentas como Postman ou Insomnia para interagir com os endpoints da API.**

## Endpoints

**Cadastro de Carros**

**POST /api/v1/cars**

Permite cadastrar um novo carro no sistema.

Exemplo de Requisição:

- `brand`: "Volkswagen",

- `model`: "GOL G5",

- `year`: 2021,

- `items`: ["Ar-condicionado", "Direção Hidráulica", "Trava Elétrica"]

## Listar Carros

GET /api/v1/cars

Lista os carros cadastrados com opções de paginação e filtros.

**Parâmetros de Query Opcionais**:

- `page`: Número da página (padrão: 1)
- `limit`: Número de registros por página (padrão: 5, mínimo: 1, máximo: 10)
- `brand`: Filtrar por parte do nome da marca
- `model`: Filtrar por parte do nome do modelo
- `year`: Filtrar por carros com anos a partir do valor enviado
  **Exemplo de Requisição:**
  /api/v1/cars?page=1&limit=2&brand=vol&model=gol&year=2015

## Buscar Carro por ID

GET /api/v1/cars/:id

Obtém os detalhes de um carro específico pelo ID.

## Atualizar Carro

**PATCH** `/api/v1/cars/:id`

Atualiza as informações de um carro existente. Todos os campos são opcionais.

### Exemplo de Requisição:

- `brand`: "Volkswagen",
- `model`: "GOL",
- `year`: 2015,
- `items`: ["Airbag", "Freios ABS"]

## Excluir Carro

**DELETE /api/v1/cars/:id**

Exclui um carro e seus itens associados do sistema.

## Estrutura do Banco de Dados

**Database**: `compasscar`

### Tabela `cars`:

| Coluna  | Tipo    | Descrição           |
| ------- | ------- | ------------------- |
| `id`    | INT     | Chave Primária (PK) |
| `brand` | VARCHAR | Marca do carro      |
| `model` | VARCHAR | Modelo do carro     |
| `year`  | INT     | Ano de fabricação   |

### Tabela `cars_items`:

| Coluna   | Tipo    | Descrição                             |
| -------- | ------- | ------------------------------------- |
| `id`     | INT     | Chave Primária (PK)                   |
| `name`   | VARCHAR | Nome do item (ex: Airbag)             |
| `car_id` | INT     | Chave Estrangeira (FK) para `cars.id` |

## Convenções de Commit

Os commits devem ser pequenos e escritos em inglês, seguindo o padrão semântico (Conventional Commits).

Exemplos:

- `feat: add car creation endpoint`
- `fix: correct validation for car year`

## Contribuidores

- [Wagner_Suzano](https://github.com/WagnerSuzano2)
