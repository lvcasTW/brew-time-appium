from __future__ import annotations

from appium.webdriver.common.appiumby import AppiumBy

from pages.base_page import BasePage


class CheckoutPage(BasePage):
    SCREEN = "screen-checkout"
    BTN_WEBVIEW = "btn-open-payment-webview"
    WEBVIEW = "webview-payment"
    BTN_CLOSE_WEBVIEW = "btn-close-webview"

    def fill_address(self, street: str, number: str, city: str) -> None:
        self.wait_visible(self.SCREEN)
        self.find("input-address-street").send_keys(street)
        self.find("input-address-number").send_keys(number)
        self.find("input-address-city").send_keys(city)

    def open_payment_webview(self) -> None:
        self.find(self.BTN_WEBVIEW).click()
        self.wait_visible(self.WEBVIEW)

    def close_payment_webview(self) -> None:
        self.find(self.BTN_CLOSE_WEBVIEW).click()

    def switch_to_webview(self) -> str:
        ctxs = self.driver.contexts
        for c in ctxs:
            if "WEBVIEW" in c.upper():
                self.driver.switch_to.context(c)
                return c
        raise AssertionError(f"Nenhum contexto WEBVIEW em: {ctxs}")

    def switch_to_native(self) -> None:
        self.driver.switch_to.context("NATIVE_APP")

    def confirm_pay_in_web_dom(self) -> None:
        """Exemplo de seletor web (após switch_to.webview)."""
        btn = self.driver.find_element(AppiumBy.CSS_SELECTOR, "#btn-confirm-pay")
        btn.click()
