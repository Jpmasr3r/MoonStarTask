# MoonStarTask

O **MoonStarTask** é um sistema de gerenciamento de tarefas desenvolvido durante o curso de front-end. A aplicação utiliza JavaScript para manipular dinamicamente o DOM e integrar os conceitos estudados ao longo das aulas.

## Funcionalidades solicitadas

As funcionalidades mínimas propostas na atividade foram implementadas na seguinte ordem:

1. **Cadastrar tarefas:** permite informar um título e uma descrição para criar uma nova tarefa.
2. **Visualizar as tarefas cadastradas:** apresenta as tarefas dinamicamente na página.
3. **Marcar tarefas como concluídas:** alterna o estado da tarefa entre "Em execução" e "Completa".
4. **Filtrar tarefas:** pesquisa tarefas pelo título e pela descrição.
5. **Excluir tarefas:** remove uma tarefa da lista.
6. **Armazenar os dados no `localStorage`:** mantém as tarefas disponíveis após atualizar ou fechar a página.

## Funcionalidades extras

Além dos requisitos da atividade, foram adicionadas melhorias para tornar o projeto mais completo, agradável e intuitivo:

- **Edição de tarefas:** permite alterar o título e a descrição de uma tarefa já cadastrada.
- **Reordenação das tarefas:** permite arrastar os cartões para modificar sua ordem na lista.
- **Temas claro e escuro:** oferece duas opções visuais e salva no `localStorage` o tema escolhido.
- **Música de fundo opcional:** disponibiliza um botão para tocar ou pausar a música.
- **Ícone de música adaptado ao tema:** utiliza uma nota laranja no tema claro e roxa no tema escuro.
- **Tratamento de áudio indisponível:** desativa o botão de música sem interromper a aplicação quando o arquivo não está presente.
- **Interface responsiva:** adapta a organização dos elementos para telas menores.
- **Acessibilidade:** utiliza descrições e estados ARIA nos controles de tema e música.

## Conceitos praticados

- Manipulação dinâmica do DOM.
- Eventos de clique e ponteiro.
- Classes e módulos JavaScript.
- Separação entre dados, interface e regras da aplicação.
- Persistência de dados com `localStorage`.
- Criação de uma interface responsiva com HTML e CSS.
- Organização e versionamento do projeto com Git e GitHub.

## Tecnologias

- HTML5
- CSS3
- JavaScript com ES Modules
- Web Storage API (`localStorage`)
- Biome para formatação e análise estática
- Git e GitHub para versionamento

## Como executar

Como o projeto utiliza módulos JavaScript, execute-o por meio de um servidor HTTP local. Por exemplo:

```bash
python3 -m http.server 8000
```

Depois, acesse [http://localhost:8000](http://localhost:8000) no navegador.

## Música de fundo

Os arquivos de áudio não fazem parte deste repositório porque são protegidos por direitos autorais. Para utilizar a música de fundo localmente, adicione um arquivo autorizado em `audio/moonsetter.mp3`.

Quando o áudio não está disponível, como na versão publicada no GitHub, o botão de música é desativado sem afetar as demais funcionalidades.

## Estrutura

```text
.
├── images/
│   ├── nota-musical-claro.svg
│   ├── nota-musical-escuro.svg
│   ├── tema-claro.svg
│   └── tema-escuro.svg
├── src/
│   ├── Task.js
│   ├── TaskApp.js
│   ├── TaskRepository.js
│   └── TaskView.js
├── .gitignore
├── biome.json
├── index.html
├── script.js
└── style.css
```

O diretório `audio/` é utilizado apenas localmente e está listado no `.gitignore` para impedir a publicação de arquivos protegidos por direitos autorais.

## Licença

O código-fonte deste projeto é distribuído sob a **GNU General Public License v3.0 (GPL-3.0)**. É permitido usar, estudar, modificar e redistribuir o código, desde que os trabalhos derivados também sejam disponibilizados sob a GPL v3 e preservem os avisos de autoria e licença.

Os arquivos de áudio utilizados localmente não fazem parte deste projeto nem estão cobertos pela GPL v3. Cada áudio permanece sujeito aos direitos autorais e aos termos definidos por seu respectivo titular.

Consulte o texto completo da [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.html).
