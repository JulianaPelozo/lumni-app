# 🌙 Lumni – Apoio Emocional para Universitários

> *Registre seu humor, sono, energia e tarefas. Receba padrões de comportamento e alertas preventivos.*

---
![Banner da Lumni](images/banner.png)

## 📌 Sobre o Projeto

Lumni é uma aplicação web desenvolvida para ajudar estudantes universitários a identificar padrões emocionais e comportamentais.
Através de registros diários, a ferramenta gera gráficos e insights personalizados, promovendo o autoconhecimento e o bem-estar.

### Problema Resolvido

Muitos estudantes sofrem com sobrecarga, procrastinação e isolamento, mas não conseguem perceber como o sono, a energia e a produtividade afetam seu humor ao longo do tempo.

### Solução

Um diário emocional que oferece **alertas contextuais**, como:

> “Você costuma ficar pior após 3 dias dormindo pouco.”

Além disso, a plataforma disponibiliza visualizações intuitivas dos dados em gráficos interativos.

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

## Banco de Dados

* PostgreSQL (produção)
* SQLite (desenvolvimento local)

## Cloud (Azure – planejado)

* Azure App Service (Linux)
* Azure Database for PostgreSQL
* GitHub Actions para CI/CD

---

# 🧩 Funcionalidades

* [x] Cadastro e login com autenticação JWT
* [x] Registro diário de:

  * Humor (1 a 5)
  * Energia (1 a 5)
  * Horas de sono
  * Tarefas concluídas
* [x] Histórico emocional dos últimos 30 dias
* [x] Gráficos interativos
* [x] Alertas automáticos baseados em padrões
* [x] Interface responsiva
* [x] Design com temática lunar e meditativa

---

# 🖥️ Como Rodar Localmente

## Pré-requisitos

* Python 3.10+
* Git
* PostgreSQL (opcional)

---

## 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/lumni.git
cd lumni
```

---

## 2. Crie e ative um ambiente virtual

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

## 4. Configure as variáveis de ambiente (opcional)

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/lumni
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

💡 Caso o PostgreSQL não esteja configurado, o sistema utilizará SQLite automaticamente.

---

# ☁️ Deploy na Nuvem (Azure)

Este projeto foi desenvolvido como trabalho acadêmico e está preparado para implantação no Microsoft Azure.

---

## Arquitetura Proposta

```txt
[Usuário]
    ↓ HTTPS
Azure App Service (Linux)
    ↓
Gunicorn
    ↓
Flask App
    ↓
Azure Database for PostgreSQL
```

---

## Etapas para Deploy

### 1. Criar o Banco de Dados

Provisionar um:

* Azure Database for PostgreSQL – Flexible Server

Criar o banco:

```txt
lumni_db
```

---

### 2. Criar o App Service

Configurações recomendadas:

* Sistema Operacional: Linux
* Runtime: Python 3.10
* Plano: F1 (gratuito)

---

### 3. Configurar Variáveis de Ambiente

Adicionar no Azure App Service:

```env
AZURE_POSTGRESQL_CONNECTIONSTRING=sua-string
SECRET_KEY=sua-chave
JWT_SECRET_KEY=sua-outra-chave
```

---

### 4. Fazer o Deploy

Opções:

* GitHub Actions
* Deploy manual via Git

---

### 5. Acessar a aplicação

```txt
https://lumni-app.azurewebsites.net
```

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
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
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
4. Visualize gráficos automáticos
5. Receba insights e alertas personalizados

---

# 🤝 Contribuição

Este é um projeto acadêmico, mas sugestões são muito bem-vindas.

Você pode:

* abrir uma issue
* enviar um pull request
* sugerir melhorias

---

# 👩‍🎓 Autora

**Juliana Pelozo Pacheco**
Estudante de Análise e Desenvolvimento de Sistemas — Faculdade Senac

Projeto desenvolvido para a disciplina de Cloud Computing.

---

# 📄 Licença

MIT License.

---

# 🌟 Agradecimentos

* Microsoft Azure for Students
* Comunidade Open Source
* Ecossistema Python + Flask
* Inspiração estética lunar e meditativa 🌙

---

# ✨ Lumni

> *Entender seus próprios padrões é o primeiro passo para o equilíbrio.*
