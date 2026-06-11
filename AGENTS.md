# FitTrack - Guia de Manutenção

## Contexto

FitTrack é um aplicativo React Native com Expo SDK 54, escrito em JavaScript. O projeto gerencia treinos, exercícios e histórico de cargas com persistência exclusivamente local.

Antes de alterar APIs do Expo, consulte a documentação correspondente ao SDK 54:

https://docs.expo.dev/versions/v54.0.0/

## Regras do Projeto

- Mantenha o projeto em JavaScript. Não adicione TypeScript, arquivos `.ts`, `.tsx` ou `tsconfig.json`.
- Não adicione backend, banco externo ou autenticação sem solicitação explícita.
- Preserve a persistência exclusiva via AsyncStorage.
- Não altere regras de negócio durante tarefas de manutenção ou auditoria.
- Evite dependências novas quando a plataforma ou a estrutura atual já resolverem o problema.
- Não importe caminhos internos de bibliotecas, como `react-native-web/dist/*`, `react-native/Libraries/*`, `lib/*` ou `src/*`.
- Importe componentes React Native apenas pelo pacote público `react-native`.
- Use imports relativos para módulos internos da aplicação.
- Mantenha o tema e os tokens visuais centralizados em `src/constants/theme.js`.

## Arquitetura

- `src/components`: componentes reutilizáveis.
- `src/screens`: telas e composição da interface.
- `src/navigation`: configuração do React Navigation.
- `src/hooks`: estado global e hooks compartilhados.
- `src/services`: regras de negócio.
- `src/storage`: persistência com AsyncStorage.
- `src/utils`: funções utilitárias.
- `src/constants`: tema e dados iniciais.

As telas devem consumir operações por meio de `useAppData`. Regras de transformação dos dados devem permanecer no `workoutService`, e acesso ao AsyncStorage deve permanecer em `appStorage`.

## Convenções

- Use componentes funcionais e hooks.
- Prefira nomes claros em inglês para código e português para textos da interface.
- Evite duplicação e mantenha componentes com responsabilidade única.
- Não deixe imports, variáveis, exports ou arquivos sem uso.
- Não adicione logs, `debugger`, `TODO` ou supressões sem justificativa.
- Formate alterações com `npm run format`.

## Dependências

- Instale módulos compatíveis com o Expo usando `npx expo install <pacote>`.
- Mantenha `react-native-screens` e `react-native-safe-area-context` como dependências diretas do React Navigation.
- Mantenha `react-dom` e `react-native-web` enquanto houver suporte ao comando `npm run web`.
- Não execute atualizações principais do Expo como correção automática.

## Validação

Após alterações relevantes, execute:

```bash
npm install
npx expo install --check
npx expo-doctor
npx expo export --platform android
npx expo export --platform web
```

Para alterações apenas de documentação, valide referências e formatação sem gerar bundles desnecessariamente.
