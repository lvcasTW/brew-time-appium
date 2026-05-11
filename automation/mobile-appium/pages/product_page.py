from __future__ import annotations

from pages.base_page import BasePage


class ProductPage(BasePage):
    SCREEN = "screen-product-detail"
    BTN_ADD = "btn-add-cart"

    def wait_product(self) -> None:
        self.wait_visible(self.SCREEN)

    def choose_size(self, size: str) -> None:
        self.find(f"size-{size}").click()

    def toggle_sugar(self) -> None:
        self.find("switch-sugar").click()

    def toggle_whipped(self) -> None:
        self.find("switch-whipped").click()

    def add_to_cart(self) -> None:
        self.find(self.BTN_ADD).click()
