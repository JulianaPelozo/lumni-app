# 🌙 Lumni – Apoio Emocional para Universitários

<p align="center">
  <img src="images/banner.png" width="900">
</p>

> *Registre seu humor, sono, energia e tarefas. Receba padrões de comportamento e alertas preventivos.*

---

# 📌 Sobre o Projeto

Lumni é uma aplicação web desenvolvida para ajudar estudantes universitários a identificar padrões emocionais e comportamentais.

Através de registros diários, a ferramenta gera gráficos e insights personalizados, promovendo autoconhecimento, equilíbrio emocional e bem-estar.

---

## 🎯 Problema Resolvido

Muitos estudantes sofrem com:

* sobrecarga acadêmica
* procrastinação
* ansiedade
* isolamento
* privação de sono

Porém, frequentemente não conseguem perceber como hábitos diários impactam diretamente seu humor e produtividade.

---

## 💡 Solução

O Lumni funciona como um diário emocional inteligente.

A aplicação permite registrar:

* humor
* energia
* horas de sono
* tarefas concluídas

Com base nesses dados, o sistema gera:

* gráficos interativos
* históricos emocionais
* alertas automáticos
* padrões comportamentais

Exemplo de insight:

> “Você costuma apresentar piora no humor após vários dias dormindo pouco.”

---

# 🚀 Tecnologias Utilizadas

## Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap 5
* Chart.js

## Backend

* Python 3.10+
* Flask
* Flask-JWT-Extended
* SQLAlchemy

## Banco de Dados

* MySQL
* SQLite (desenvolvimento local)

## Ferramentas

* MySQL Workbench
* Git
* GitHub

## Cloud (Azure – planejado)

* Azure App Service (Linux)
* Azure Database for MySQL
* GitHub Actions para CI/CD

---

# 🧩 Funcionalidades

* [x] Cadastro de usuários
* [x] Login com autenticação JWT
* [x] Registro diário de:

  * Humor (1 a 5)
  * Energia (1 a 5)
  * Horas de sono
  * Tarefas concluídas
* [x] Histórico emocional
* [x] Gráficos interativos
* [x] Alertas automáticos baseados em padrões
* [x] Dashboard responsivo
* [x] Interface com temática lunar e meditativa

---

# 🖼️ Interface

## Tela Inicial

* Página de apresentação da plataforma
* Acesso para login e cadastro

## Dashboard

* Registro emocional diário
* Visualização de gráficos
* Alertas inteligentes

## Sistema de Autenticação

* Cadastro de usuário
* Login seguro utilizando JWT

---

# 🖥️ Como Rodar Localmente

## Pré-requisitos

* Python 3.10+
* Git
* MySQL Server
* MySQL Workbench (opcional)

---

## 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/lumni.git
cd lumni
```

---

## 2. Crie um ambiente virtual

### Linux/Mac

```bash
python -m venv venv
source venv/bin/activate
```

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

## 3. Instale as dependências

```bash
pip install -r requirements.txt
```

---

## 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=mysql+pymysql://usuario:senha@localhost:3306/lumni
SECRET_KEY=sua-chave-secreta
JWT_SECRET_KEY=sua-outra-chave-secreta
```

---

## 5. Execute a aplicação

```bash
python app.py
```

---

## 6. Acesse no navegador

```txt
http://localhost:5000
```

---

## 💡 Observação

Caso o MySQL não esteja configurado, o sistema pode utilizar SQLite para desenvolvimento local.

---

# ☁️ Deploy na Nuvem (Azure)

Este projeto foi desenvolvido como trabalho acadêmico e está preparado para implantação no Microsoft Azure.

---

# 🏗️ Arquitetura Proposta

```txt
[Usuário]
    ↓ HTTPS
Azure App Service (Linux)
    ↓
Gunicorn
    ↓
Flask App
    ↓
Azure Database for MySQL
```

---

# 🚀 Etapas para Deploy

## 1. Criar o Banco de Dados

Provisionar um:

* Azure Database for MySQL

Criar um banco chamado:

```txt
lumni_db
```

---

## 2. Criar o App Service

Configurações recomendadas:

* Sistema Operacional: Linux
* Runtime: Python 3.10
* Plano: F1 (gratuito)

---

## 3. Configurar Variáveis de Ambiente

Adicionar no Azure App Service:

```env
DATABASE_URL=sua-string-de-conexao
SECRET_KEY=sua-chave
JWT_SECRET_KEY=sua-outra-chave
```

---

## 4. Fazer o Deploy

Você pode utilizar:

* GitHub Actions
* Deploy manual via Git
* Integração direta do Azure com GitHub

---

# 📂 Estrutura do Projeto

```txt
lumni/
├── app.py
├── models.py
├── auth.py
├── requirements.txt
├── startup.txt
├── .env
├── .gitignore
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
└── README.md
```

---

# 🧪 Exemplo de Uso

1. Crie uma conta
2. Faça login
3. Registre:

   * humor
   * energia
   * horas de sono
   * tarefas concluídas
4. Visualize os gráficos
5. Receba insights automáticos

---

# 🔒 Segurança

* Autenticação JWT
* Senhas criptografadas
* Controle de sessão
* Proteção básica de rotas autenticadas

---

# 🤝 Contribuição

Este é um projeto acadêmico, mas sugestões são muito bem-vindas.

Você pode:

* abrir uma issue
* sugerir melhorias
* enviar pull requests

---

# 👩‍🎓 Autora

**Juliana Pelozo Pacheco**
**Carolina Maria dos Santos**
**Luiz Felipe Moraes Santos**
**Maria Clara Varjão**
**Pérola Luly**
**Saulo de Lucena**
**Saulo Monteiro**
Estudante de Análise e Desenvolvimento de Sistemas — Faculdade Senac

Projeto desenvolvido para a disciplina de Cloud Computing.

---

# 📄 Licença

Este projeto está sob a licença MIT.

---

# 🌟 Agradecimentos

* Microsoft Azure for Students
* Comunidade Open Source
* Ecossistema Python + Flask
* Bootstrap
* Chart.js

---

# 🌙 Lumni

> *Entender seus próprios padrões é o primeiro passo para o equilíbrio.*
