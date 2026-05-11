# BrewTime — Cafeteria online + Appium

Monorepo com **app mobile (React Native / Expo)** e **testes end-to-end (Appium + Python + pytest)** em Page Object Model, com exemplos para Allure, WebView, deep links e execução paralela.

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
4. **JDK 17** para builds Gradle com Expo (recomendação oficial): no Android Studio, **Settings → Build, Execution, Deployment → Build Tools → Gradle → Gradle JDK** → escolha JDK 17; ou defina `JAVA_HOME` para um JDK 17 ao usar a linha de comando.
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

Stack: **Python**, **Appium 2**, **pytest**, **pytest-xdist**, **Allure**, **Page Object Model**.

### Setup

```bash
cd automation
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Suba o **Appium 2** com driver UiAutomator2 e um emulador/dispositivo Android. Veja variáveis em [`automation/env.example`](automation/env.example).

### Rodar testes

Na pasta `automation/`:

```bash
pytest tests/ -v
```

Por marcador:

```bash
pytest -m level1 tests/
pytest -m level2 tests/
pytest -m level3 tests/
```

### Allure

```bash
pytest tests/ --alluredir=allure-results
allure serve allure-results
```

### Paralelo (dois emuladores)

1. Suba dois AVDs (ex.: `emulator-5554` e `emulator-5556`).
2. Ajuste `BREWTIME_UDID_GW0` / `BREWTIME_UDID_GW1` se necessário.
3. Execute:

```bash
pytest -n 2 tests/
```

Cada worker recebe um UDID distinto em `conftest.py`.

### Deep link nos testes

O teste usa `adb` com o UDID da sessão (`utils/deeplink.py`). Exija `adb` no `PATH` e permissão de depuração USB no dispositivo.

### Mapeamento de seletores

No React Native, `testID` aparece como **Accessibility ID** no Appium (preferencial). Há um exemplo de **XPath** em `tests/test_level1_fundamentos.py` apenas para estudo — evite em produção.

## Estrutura

```
mobile/           # Expo + React Navigation
automation/
  pages/          # Page Objects
  tests/          # Nível 1, 2 e 3
  utils/          # adb / deep link
```

## Licença

Veja o arquivo `LICENSE` do repositório.
