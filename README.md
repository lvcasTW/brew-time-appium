# BrewTime — Cafeteria online + Appium

Monorepo com **app mobile (React Native / Expo)** e **automação** em três frentes: **mobile (Appium)**, **API (Karate DSL)** e **performance (k6)** — ver [`automation/README.md`](automation/README.md).

## App (`mobile/`)

Funcionalidades:

- **Login**: e-mail, senha, Google e Apple (simulados).
- **Catálogo**: cafés por categorias (Expresso, Latte, Gelados) e lista longa para exercitar scroll.
- **Detalhe**: tamanhos P/M/G, açúcar e chantilly, preço e adicionar ao carrinho.
- **Carrinho**: quantidade, **swipe** para revelar exclusão.
- **Checkout**: endereço, PIX/cartão, **WebView** de pagamento simulado (troca de contexto).
- **Favoritos**: **long press** no item do catálogo.
- **Deep link**: `brewtime://product/<id>` (ex.: `brewtime://product/gelado-17`).

Conta demo: `demo@brewtime.app` / `brew123`.

### Rodar o app

```bash
cd mobile
npm install
npx expo start
```

### Build e execução no emulador Android (Android Studio)

Fluxo para gerar o projeto nativo, compilar e instalar no emulador (package **`com.brewtime.app`**, alinhado aos testes Appium).

#### Pré-requisitos

1. **Node.js** (LTS) e **npm**.
2. **Android Studio** com **Android SDK**, **Platform-Tools** e **Emulador** instalados (via SDK Manager).
3. Pelo menos uma **imagem de sistema** (API) para criar um AVD.
4. **JDK** para o processo do Gradle: **17, 21 ou 26**. O projeto usa **Gradle 9.4.1** e **AGP 8.13.2**, o que permite rodar o daemon com **JDK 26** (sem o erro *Unsupported class file major version 70* do Gradle antigo). No Android Studio: **Settings → Build, Execution, Deployment → Build Tools → Gradle → Gradle JDK** → escolha o JDK instalado (ex.: **26**). Na linha de comando: `export JAVA_HOME=$(/usr/libexec/java_home -v 26)` (ou `-v 21` / `-v 17`). **Nota:** o **bytecode** do app Android continua em **Java 21** / Kotlin **jvmTarget 21** (compatível com Expo SDK 52 e React Native 0.76); isso é independente da versão do JDK que executa o Gradle.
5. Variáveis de ambiente (ex.: `~/.zshrc` no macOS):
   - `ANDROID_HOME` apontando para o SDK (ex.: `~/Library/Android/sdk`).
   - Incluir no `PATH`: `$ANDROID_HOME/platform-tools` e `$ANDROID_HOME/emulator`.

#### 1. Criar e iniciar o emulador

1. Abra o **Android Studio** → **Device Manager**.
2. **Create Device** → escolha um perfil de hardware → **Next**.
3. Escolha uma **System Image** (faça **Download** se necessário) → **Next** → **Finish**.
4. Inicie o AVD com o botão **Run** e mantenha o emulador aberto.

#### 2. Instalar dependências e buildar no emulador

Com o emulador **ligado**:

```bash
cd mobile
npm install
npx expo run:android
```

Na primeira execução, o Expo cria a pasta `android/`, compila o app e instala no emulador.

Se existir mais de um dispositivo ou emulador conectado:

```bash
npx expo run:android --device
```

e selecione o alvo na lista.

#### 3. Bundler (Metro) em desenvolvimento

Após o primeiro `npx expo run:android`, o Metro costuma subir junto. Se precisar só do bundler:

```bash
cd mobile
npx expo start
```

Para alterações **nativas**, use de novo `npx expo run:android` conforme a documentação do Expo.

#### Conferência

- O app instalado deve usar o package **`com.brewtime.app`**.
- Conta demo: `demo@brewtime.app` / `brew123`.

Use o **mesmo** `applicationId` / `package` nas capabilities dos testes (`BREWTIME_APP_PACKAGE`).

## Automação (`automation/`)

| Pasta | Stack |
|--------|--------|
| [`automation/mobile-appium/`](automation/mobile-appium/) | Python, Appium 2, pytest, Page Objects, Allure |
| [`automation/api-karate/`](automation/api-karate/) | Karate DSL, Maven, JUnit 5 |
| [`automation/performance-k6/`](automation/performance-k6/) | Grafana k6 |

Índice e detalhes: [`automation/README.md`](automation/README.md).

### Mobile (Appium)

```bash
cd automation/mobile-appium
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest tests/ -v
```

Variáveis: [`automation/mobile-appium/env.example`](automation/mobile-appium/env.example). Suba **Appium 2** (UiAutomator2) e o emulador/dispositivo.

Por marcador: `pytest -m level1 tests/` (e `level2`, `level3`). Paralelo: `pytest -n 2 tests/`. Allure: `pytest tests/ --alluredir=allure-results`.

`adb` no `PATH` para deep links (`utils/deeplink.py`). `testID` no RN mapeia a **Accessibility ID** no Appium.

### API (Karate)

```bash
cd automation/api-karate
mvn test
```

### Performance (k6)

```bash
cd automation/performance-k6
k6 run scripts/brewtime-smoke.js
```

## Estrutura

```
mobile/
automation/
  README.md
  mobile-appium/   # pytest, pages, tests, config, utils
  api-karate/      # pom.xml, features Karate, runner JUnit
  performance-k6/ # scripts k6
```

## Licença

Veja o arquivo `LICENSE` do repositório.
