# Gerenciador de Tarefas

Projeto de estudo front-end para criar e visualizar tarefas diretamente no navegador.

## Funcionalidades atuais

- Abertura de uma janela para cadastrar tarefas.
- Cadastro de título e descrição.
- Exibição das tarefas criadas durante a sessão.

## Tecnologias

- HTML5
- CSS3
- JavaScript com ES Modules
- Biome para formatação e análise estática

## Como executar

Como o projeto utiliza módulos JavaScript, execute-o por meio de um servidor HTTP local. Por exemplo:

```bash
python3 -m http.server 8000
```

Depois, acesse [http://localhost:8000](http://localhost:8000) no navegador.

## Estrutura

```text
.
├── index.html
├── script.js
├── style.css
├── biome.json
└── src/
    └── Task.js
```

## Próximos passos

- Permitir editar tarefas.
- Permitir remover tarefas.
- Validar os campos do formulário.
- Persistir as tarefas entre sessões.
