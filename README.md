# API Login - Trabalho UNICV

## 📸 Evidências de Testes

### Testes no Postman

#### 🔐 Testes de Autenticação
![Login Successful](./docs/Images/login-user.png)
*Login realizado com sucesso - Status 200*

![Login Error](./docs/Images/Error-login.png) 
*Login com erro - Status 401*

#### 👥 Testes de Criação de Usuário
![User Creation Successful](./docs/Images/create-user.png)
*Usuário criado com sucesso - Status 201*

![User Creation Error](./docs/Images/Erro-criacao.png)
*Erro na criação de usuário - Status 400*

### 🐳 Testes no Docker
![Docker Containers](./docs/Images/docker-containers.png)
*Containers rodando: API, Redis e PostgreSQL*

![Docker Logs](./docs/Images/docker-logs.png)
*Logs da aplicação mostrando autenticação JWT*
