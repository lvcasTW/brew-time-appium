# Mobile — Appium

Python, Appium 2, pytest, Page Object Model.

```bash
cd automation/mobile-appium
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest tests/ -v
```

Variáveis: copie [`env.example`](env.example) para `.env` ou exporte manualmente. Suba o servidor Appium e um emulador/dispositivo antes dos testes.
