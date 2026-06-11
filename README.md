# FitTrack

## Visão Geral

FitTrack é um aplicativo mobile para gerenciamento de treinos de academia, desenvolvido com React Native, Expo e JavaScript. Ele permite organizar fichas de treino, cadastrar exercícios, registrar cargas e acompanhar a evolução do usuário.

O projeto utiliza uma arquitetura modular, componentes reutilizáveis e persistência local, sem depender de backend ou conexão com serviços externos.

## Objetivo

Oferecer uma experiência simples e profissional para organização da rotina de musculação, permitindo que o usuário mantenha seus treinos e acompanhe sua progressão de carga diretamente no dispositivo.

## Funcionalidades

- Dashboard com resumo geral da rotina.
- Quantidade total de treinos e exercícios.
- Destaque do exercício com maior carga.
- Indicação da última atualização registrada.
- Criação, edição e exclusão de treinos.
- Definição de nome, foco muscular e cor de destaque.
- Criação, edição e remoção de exercícios.
- Registro de séries, repetições e carga em quilogramas.
- Histórico automático quando uma carga é alterada.
- Indicadores de progresso por exercício.
- Estatísticas de evolução e ganho total de carga.
- Dados iniciais criados automaticamente no primeiro acesso.
- Persistência local após fechar e abrir o aplicativo.
- Tema escuro e interface responsiva.

## Tecnologias Utilizadas

- React Native
- Expo SDK 54
- JavaScript
- React Navigation
- AsyncStorage
- `@expo/vector-icons`
- React Context API
- Prettier

## Arquitetura do Projeto

A aplicação está organizada por responsabilidades:

- **components:** componentes visuais reutilizáveis, cards, botões e formulários.
- **screens:** telas completas e composição da interface.
- **navigation:** configuração da navegação por abas e pilha.
- **hooks:** estado global e operações disponibilizadas para as telas.
- **services:** regras de negócio e operações imutáveis sobre os dados.
- **storage:** acesso isolado ao AsyncStorage.
- **utils:** funções compartilhadas de datas, identificadores e estatísticas.
- **constants:** tema visual e dados iniciais.

O `AppProvider` centraliza o estado da aplicação. As telas acessam os dados por meio do hook `useAppData`, enquanto o `workoutService` aplica as operações de negócio e o `appStorage` persiste os resultados.

## Estrutura de Pastas

```text
FitTrack/
├── assets/
├── src/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── storage/
│   └── utils/
├── App.jsx
├── index.js
├── app.json
├── package.json
└── README.md
```

## Decisões Técnicas

- **JavaScript moderno:** uso de módulos ES, componentes funcionais e hooks.
- **Context API:** solução suficiente para o estado global atual sem adicionar uma biblioteca de gerenciamento de estado.
- **Serviço de domínio separado:** regras de criação, edição e exclusão não ficam acopladas às telas.
- **AsyncStorage isolado:** permite substituir a persistência futuramente sem reescrever a interface.
- **Histórico automático:** alterações de carga criam registros datados para manter a evolução consistente.
- **Dados iniciais versionados:** a chave local `@fittrack:data:v1` permite evolução controlada do formato persistido.
- **Componentes reutilizáveis:** botões, cards, modais, campos e estados vazios seguem o mesmo padrão visual.
- **Configuração padrão do Expo:** não há `babel.config.js` ou `metro.config.js` porque o projeto não exige customizações.

## Fluxo de Navegação

```text
Abas principais
├── Início
├── Treinos
│   └── Detalhes do treino
│       ├── Editar ou excluir treino
│       └── Adicionar, editar ou remover exercício
└── Evolução
```

A navegação principal utiliza `BottomTabNavigator`. A tela de detalhes utiliza `NativeStackNavigator`, preservando o comportamento nativo de retorno.

## Persistência de Dados

Todos os dados são armazenados exclusivamente no AsyncStorage do dispositivo.

No primeiro acesso, o aplicativo cria automaticamente três treinos com exercícios e históricos de carga. Nas execuções seguintes, os dados persistidos são carregados e qualquer alteração é salva localmente.

Não existe backend, banco de dados externo ou autenticação.

## Instalação

Pré-requisitos:

- Node.js 20 ou superior
- npm
- Expo Go ou emulador Android/iOS configurado

```bash
git clone <url-do-repositorio>
cd FitTrack
npm install
```

## Execução

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Comandos disponíveis:

```bash
npm run android
npm run ios
npm run web
npm run format
```

Após executar `npm start`, leia o QR Code com o Expo Go ou selecione a plataforma desejada no terminal.

## Exemplos de Uso

1. Acesse **Treinos** e selecione **Criar novo treino**.
2. Informe nome, foco muscular e cor de destaque.
3. Abra o treino criado e adicione exercícios.
4. Registre séries, repetições e carga.
5. Edite a carga após uma nova sessão para adicionar um registro ao histórico.
6. Acesse **Evolução** para visualizar indicadores e comparar cargas.

## Qualidade e Validação

O projeto foi auditado e validado com:

- Resolução estática de imports.
- Verificação de imports internos ou inválidos.
- Análise de imports, bindings e arquivos não utilizados.
- `npm install`.
- `npx expo install --check`.
- `npx expo-doctor`.
- Export dos bundles Android e Web.
- Inicialização real do Metro Bundler.

## Possíveis Melhorias Futuras

- Cronômetro de descanso entre séries.
- Registro de treinos concluídos e calendário de frequência.
- Gráficos avançados de volume e progressão.
- Metas semanais e notificações.
- Exportação e compartilhamento de fichas.
- Testes automatizados.
- Sincronização opcional em nuvem.
- Tema claro opcional.

## Autor

**Felipe dos Santos**
