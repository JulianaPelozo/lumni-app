# 🌙 Lumni – Apoio Emocional para Universitários

> *Registre seu humor, sono, energia e tarefas. Receba padrões de comportamento e alertas preventivos.*

![Lumni Banner](https://via.placeholder.com/1200x400/0b1120/e0e4f0?text=Lumni+-+Lunar+Emotional+Support)

## 📌 Sobre o Projeto

Lumni é uma aplicação web desenvolvida para ajudar estudantes universitários a identificar padrões emocionais e comportamentais. Através de registros diários, a ferramenta gera gráficos e insights personalizados, promovendo o autoconhecimento e o bem-estar.

**Problema resolvido:**  
Muitos estudantes sofrem com sobrecarga, procrastinação e isolamento, mas não conseguem perceber como o sono, a energia e a produtividade afetam seu humor ao longo do tempo.

**Solução:**  
Um diário emocional que oferece **alertas contextuais** (ex: *"Você costuma ficar pior após 3 dias dormindo pouco"*) e visualização dos dados em gráficos intuitivos.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5
- Chart.js

### Backend
- Python 3.10+
- Flask (microframework)
- Flask-JWT-Extended (autenticação JWT)

### Banco de Dados
- PostgreSQL (produção)
- SQLite (desenvolvimento local)

### Cloud (Azure – planejado)
- App Service (Linux) para hospedar a aplicação
- Banco de Dados do Azure para PostgreSQL (Flexible Server)
- Integração com GitHub Actions para CI/CD

---

## 🧩 Funcionalidades

- [x] Cadastro e login com JWT
- [x] Registro diário de:
  - Humor (1 a 5)
  - Nível de energia (1 a 5)
  - Horas de sono
  - Tarefas concluídas
- [x] Histórico dos últimos 30 dias
- [x] Gráficos interativos (evolução do humor, relação sono × energia)
- [x] Alertas automáticos baseados em padrões:
  - Impacto de noites mal dormidas no humor
  - Sequências de baixa energia
  - Relação entre tarefas realizadas e bem-estar
- [x] Design responsivo e temática lunar / meditativa

---

## Como Rodar Localmente

### Pré-requisitos
- Python 3.10 ou superior
- Git
- (Opcional) PostgreSQL para testes com o banco final

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/lumni.git
   cd lumni
