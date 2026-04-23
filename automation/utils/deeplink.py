"""Dispara deep links via `adb` (Android)."""

from __future__ import annotations

import subprocess
from typing import Any


def adb_open_url(driver: Any, url: str, package: str = "com.brewtime.app") -> None:
    caps = driver.capabilities
    udid = caps.get("appium:udid") or caps.get("udid")
    if not udid:
        raise RuntimeError("UDID não encontrado nas capabilities da sessão.")
    cmd = [
        "adb",
        "-s",
        str(udid),
        "shell",
        "am",
        "start",
        "-W",
        "-a",
        "android.intent.action.VIEW",
        "-d",
        url,
        package,
    ]
    subprocess.run(cmd, check=True, capture_output=True, text=True)
