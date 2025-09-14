# Projeto Login – PCS3643

Projeto inicial da disciplina **PCS3643 – Engenharia de Software (USP)** com **FastAPI** (backend) e **Vite/React** (frontend).

---

## Pré-requisitos

- **Python 3.10+**
- **pip** (vem com o Python)
- **Node.js 18+** e **npm**
- **Git**

---

## Observação importante

O arquivo **`.env`** não está neste repositório.  
Ele foi disponibilizado em **PDF no e-Disciplinas** e deve ser criado manualmente na raiz do projeto seguindo esse conteúdo.

## Como rodar o projeto localmente
### 1) Criar o arquivo .env dentro da pasta PCS-3643
A senha do banco de dados se encontra no PDF enviado no edisciplinas

### 2) Backend (FastAPI)
2.1.Criar e ativar o ambiente virtual
```bash
python -m venv venv
# Ativar no Windows (PowerShell)
.\venv\Scripts\activate
# Ativar no Linux/Mac
source venv/bin/activate
```

2.2. Instalar dependências
```bash
cd PCS-3643
pip install -r requirements.txt
```

2.3. Subir a API
```bash
uvicorn app.main:app --reload
```
- API: http://127.0.0.1:8000
- Docs (Swagger): http://127.0.0.1:8000/docs

### 3) Frontend (Vite/React)

3.1. Abrir um novo terminal e entrar na pasta do frontend
```bash
cd frontend
```

3.2. Instalar dependências
```bash
npm install
npm install lovable-tagger
```

3.3. Rodar o servidor de desenvolvimento
```bash
npm run dev
```
Assim, você deixará dois terminais rodando ao mesmo tempo: um com o backend e outro com o frontend.

- Frontend: http://localhost:8080


### Endpoints úteis

Backend (API): http://127.0.0.1:8000

Documentação FastAPI (Swagger): http://127.0.0.1:8000/docs

Documentação FastAPI (ReDoc): http://127.0.0.1:8000/redoc

### Colaboradores

- Carolina Tavares Duarte

- Lays Zandomingos
