from __future__ import annotations

from pages.base_page import BasePage


class CartPage(BasePage):
    SCREEN = "screen-cart"
    BTN_CHECKOUT = "btn-checkout"

    def row_index(self, index: int) -> str:
        return f"cart-row-{index}"

    def delete_button_index(self, index: int) -> str:
        return f"btn-delete-cart-{index}"

    def swipe_row_left_to_reveal_delete(self, index: int) -> None:
        row = self.wait_visible(self.row_index(index))
        self.driver.execute_script(
            "mobile: swipeGesture",
            {"elementId": row.id, "direction": "left", "percent": 0.8},
        )

    def tap_delete(self, index: int) -> None:
        self.find(self.delete_button_index(index)).click()

    def tap_plus(self, index: int) -> None:
        self.find(f"qty-plus-{index}").click()

    def go_checkout(self) -> None:
        self.find(self.BTN_CHECKOUT).click()
