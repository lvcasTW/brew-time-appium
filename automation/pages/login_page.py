from __future__ import annotations

from pages.base_page import BasePage


class LoginPage(BasePage):
    SCREEN = "screen-login"
    INPUT_EMAIL = "input-email"
    INPUT_PASSWORD = "input-password"
    BTN_LOGIN = "btn-login"
    BTN_GOOGLE = "btn-login-google"
    BTN_APPLE = "btn-login-apple"
    TEXT_ERROR = "text-login-error"

    def login_demo(self) -> None:
        self.wait_visible(self.SCREEN)
        self.find(self.INPUT_EMAIL).send_keys("demo@brewtime.app")
        self.find(self.INPUT_PASSWORD).send_keys("brew123")
        self.find(self.BTN_LOGIN).click()

    def login_invalid(self, email: str, password: str) -> None:
        self.wait_visible(self.SCREEN)
        self.find(self.INPUT_EMAIL).clear()
        self.find(self.INPUT_PASSWORD).clear()
        self.find(self.INPUT_EMAIL).send_keys(email)
        self.find(self.INPUT_PASSWORD).send_keys(password)
        self.find(self.BTN_LOGIN).click()

    def tap_google(self) -> None:
        self.wait_visible(self.SCREEN)
        self.find(self.BTN_GOOGLE).click()
