"""Caps Android (UiAutomator2). Ajuste via variáveis de ambiente."""

from __future__ import annotations

import os
from typing import Any


def build_android_options(
    *,
    udid: str,
    app_path: str | None = None,
    no_reset: bool = True,
) -> dict[str, Any]:
    """
    Retorna dicionário de capabilities no formato W3C Appium 2.
    - BREWTIME_APP: caminho absoluto para o .apk (opcional se o app já estiver instalado).
    - BREWTIME_APP_PACKAGE / BREWTIME_APP_ACTIVITY: quando não usa BREWTIME_APP.
    """
    pkg = os.environ.get("BREWTIME_APP_PACKAGE", "com.brewtime.app")
    act = os.environ.get("BREWTIME_APP_ACTIVITY", ".MainActivity")

    caps: dict[str, Any] = {
        "platformName": "Android",
        "appium:automationName": "UiAutomator2",
        "appium:udid": udid,
        "appium:noReset": no_reset,
        "appium:newCommandTimeout": 120,
    }

    if app_path:
        caps["appium:app"] = app_path
    else:
        caps["appium:appPackage"] = pkg
        caps["appium:appActivity"] = act

    return caps
