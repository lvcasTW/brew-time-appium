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

Para instalar no emulador Android (build nativo com o package `com.brewtime.app`, necessário para Appium):

```bash
cd mobile
npx expo run:android
```

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
