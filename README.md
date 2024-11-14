# Projeto de Gestão de Transações Financeiras

Este projeto é um sistema web desenvolvido em React, utilizando Firebase como banco de dados. O objetivo é gerenciar as transações financeiras dos usuários de forma eficiente.

**🔗 [Acesse o Sistema](https://systemfinance.netlify.app/)**

## Construído com

* [React](https://react.dev/) - Biblioteca para construção da interface.
* [Firebase Authentication](https://firebase.google.com/docs/auth) - Serviço de autenticação de usuários.
* [Firebase Firestore](https://firebase.google.com/docs/firestore) - Banco de dados NoSQL para armazenamento das transações.
* [Styled Components](https://styled-components.com/) - Para estilização dos componentes React.

## Configuração do Ambiente

* **Node.js:** Versão mais recente.
* **NPM ou Yarn:** Gerenciador de pacotes.

### Passos para Configurar o Ambiente

**1.** Instale o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/get-npm) (ou [Yarn](https://yarnpkg.com/)).

**2.** Clone o repositório do projeto:
   ```sh
   git clone https://github.com/ribollitiago/system-finance.git
   ```
**3.** Navegue até o diretório do projeto:
   ```sh
   cd system-finance
   ```
**4.** Instale as dependências do projeto:
   ```sh
   npm install
    # ou
   yarn install
   ```

## Estrutura do Projeto
### Estrutura de Pastas

```
src
│
├── components
│   ├── Form
│   │   ├── index.js
│   │   └── styles.js
│   ├── Grid
│   │   ├── index.js
│   │   └── styles.js
│   ├── GridItem
│   │   ├── index.js
│   │   └── styles.js
│   ├── Header
│   │   ├── index.js
│   │   └── styles.js
│   ├── Login
│   │   ├── index.js
│   │   └── styles.js
│   ├── Register
│   │   ├── index.js
│   │   └── styles.js
│   ├── Resume
│   │   ├── index.js
│   │   └── styles.js
│   ├── Resumeitem
│   │   ├── index.js
│   │   └── styles.js
│
├── styles
│   └── global.js
│
├── App.js
├── firebase.js
└── index.js
```
   
## Banco de dados Firebase

O banco de dados do projeto utiliza [Firebase Authentication](https://firebase.google.com/docs/auth) para o registro de usuários e [Firebase Firestore](https://firebase.google.com/docs/firestore) para o armazenamento dos dados das transações. O funcionamento é descrito a seguir:

### Firebase Authentication

* Responsável pelo registro e autenticação dos usuários.
* Cada usuário registrado recebe um identificador único (UID).

### Firebase Firestore

* Após o registro do usuário, o Firestore resgata o UID e cria uma coleção única para ele.
* Dentro dessa coleção, são armazenados o e-mail do usuário e uma subcoleção de transações, cada uma identificada por um ID único gerado aleatoriamente.

### A estrutura de dados do Firestore fica da seguinte forma:

```json
{
    "users": {
        "OLhEAQidqwR3PPzQ5EX1i2SLQa13": {
            "email": "user@gmail.com",
            "transactions": {
                "ALbEaQieqpR3PPyQ6DR2h1fRpX21": {
                    "amount": 1200,
                    "date": "2024-11-02",
                    "desc": "Salário",
                    "expense": false
                }
            }
        }
    }
}
```

### Explicação

1. **Coleção de Usuários:** Cada usuário registrado tem uma coleção própria identificada pelo UID.

2. **Dados do Usuário:** Dentro da coleção do usuário, armazenamos informações como o e-mail.

3. **Transações:** Cada transação é armazenada em uma subcoleção dentro da coleção do usuário, com um ID único gerado automaticamente.

Essa estrutura permite organizar os dados de forma eficiente e segura, facilitando o acesso e gerenciamento das transações individuais dos usuários.

## Lógica do Sistema

### Autenticação do Usuário
* Utiliza o Firebase Authentication para gerenciar a autenticação.
* Verifica o estado de autenticação do usuário usando `onAuthStateChanged`.

### Gerenciamento de Transações
* Recupera os dados do usuário autenticado do Firestore.
* Armazena e gerencia a lista de transações localmente.
* Calcula os valores de receitas, despesas e total com base nas transações armazenadas.

### Interação do Usuário
* **Registro e Login**: Formulários para registro e login dos usuários.
* **Logout**: Função para deslogar o usuário, limpando o estado atual.
* **Adicionar Transação**: Formulário que permite ao usuário adicionar novas transações.

---
⌨️ por [Tiago Ribolli](https://gist.github.com/ribollitiago)

