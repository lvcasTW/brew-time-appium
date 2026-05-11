from __future__ import annotations

import os
from typing import Generator

import pytest
from appium import webdriver
from appium.options.android import UiAutomator2Options


def _worker_udid() -> str:
    wid = os.environ.get("PYTEST_XDIST_WORKER", "master")
    mapping = {
        "master": os.environ.get("BREWTIME_UDID", "emulator-5554"),
        "gw0": os.environ.get("BREWTIME_UDID_GW0", "emulator-5554"),
        "gw1": os.environ.get("BREWTIME_UDID_GW1", "emulator-5556"),
    }
    return mapping.get(wid, os.environ.get("BREWTIME_UDID", "emulator-5554"))


def pytest_addoption(parser: pytest.Parser) -> None:
    parser.addoption(
        "--appium-server",
        default=os.environ.get("APPIUM_SERVER", "http://127.0.0.1:4723"),
        help="URL do servidor Appium 2",
    )


@pytest.fixture(scope="function")
def driver(request: pytest.FixtureRequest) -> Generator[webdriver.Remote, None, None]:
    udid = _worker_udid()
    app_path = os.environ.get("BREWTIME_APP") or None
    pkg = os.environ.get("BREWTIME_APP_PACKAGE", "com.brewtime.app")
    act = os.environ.get("BREWTIME_APP_ACTIVITY", ".MainActivity")

    opts = UiAutomator2Options()
    opts.platform_name = "Android"
    opts.udid = udid
    opts.no_reset = True
    opts.set_capability("appium:newCommandTimeout", 120)

    if app_path:
        opts.app = app_path
    else:
        opts.app_package = pkg
        opts.app_activity = act

    server = request.config.getoption("--appium-server")
    drv = webdriver.Remote(server, options=opts)
    drv.implicitly_wait(int(os.environ.get("BREWTIME_IMPLICIT_WAIT", "8")))
    yield drv
    drv.quit()
