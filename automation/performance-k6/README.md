# Performance — k6

Scripts de carga em JavaScript. Requer [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) instalado.

```bash
cd automation/performance-k6
k6 run scripts/brewtime-smoke.js
```

Opcional: `BASE_URL=https://sua-api.example k6 run scripts/brewtime-smoke.js`
