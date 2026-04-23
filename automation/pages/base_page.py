from __future__ import annotations

import time
from typing import Any

from appium.webdriver import WebElement
from appium.webdriver.common.appiumby import AppiumBy
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver import Remote


class BasePage:
    """Helpers comuns; use Accessibility ID (testID no React Native) como padrão."""

    def __init__(self, driver: Remote) -> None:
        self.driver = driver

    def find(self, accessibility_id: str) -> WebElement:
        return self.driver.find_element(AppiumBy.ACCESSIBILITY_ID, accessibility_id)

    def find_optional(self, accessibility_id: str) -> WebElement | None:
        try:
            return self.find(accessibility_id)
        except NoSuchElementException:
            return None

    def wait_visible(self, accessibility_id: str, timeout: float = 12.0) -> WebElement:
        end = time.time() + timeout
        last: Exception | None = None
        while time.time() < end:
            try:
                el = self.find(accessibility_id)
                if el.is_displayed():
                    return el
            except Exception as exc:  # noqa: BLE001
                last = exc
            time.sleep(0.35)
        raise AssertionError(f"Elemento não visível: {accessibility_id!r}") from last

    def scroll_gesture(self, direction: str, percent: float = 1.0) -> None:
        """Gestos UiAutomator2 (Appium 2). `direction`: up|down|left|right."""
        size = self.driver.get_window_size()
        w, h = int(size["width"]), int(size["height"])
        self.driver.execute_script(
            "mobile: scrollGesture",
            {
                "left": int(w * 0.08),
                "top": int(h * 0.28),
                "width": int(w * 0.84),
                "height": int(h * 0.55),
                "direction": direction,
                "percent": percent,
            },
        )

    def swipe_gesture_on_screen(self, direction: str, percent: float = 0.85) -> None:
        size = self.driver.get_window_size()
        w, h = int(size["width"]), int(size["height"])
        self.driver.execute_script(
            "mobile: swipeGesture",
            {
                "left": int(w * 0.1),
                "top": int(h * 0.35),
                "width": int(w * 0.8),
                "height": int(h * 0.45),
                "direction": direction,
                "percent": percent,
            },
        )

    def long_press_element(self, element: WebElement, duration_ms: int = 1100) -> None:
        self.driver.execute_script(
            "mobile: longClickGesture",
            {"elementId": element.id, "duration": duration_ms},
        )
