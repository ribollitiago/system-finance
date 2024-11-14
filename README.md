# Sistema de controle financeiro

**🔗 [Acesse o Sistema](https://systemfinance.netlify.app/)**

## 🛠️ Construído com

* [React](https://react.dev/) - O framework utilizado
* [Firebase](https://firebase.google.com/) - Banco de Dados

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
