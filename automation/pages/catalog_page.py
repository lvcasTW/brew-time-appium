from __future__ import annotations

from appium.webdriver.common.appiumby import AppiumBy
from selenium.common.exceptions import NoSuchElementException

from pages.base_page import BasePage


class CatalogPage(BasePage):
    SCREEN = "screen-catalog"
    LIST = "list-catalog"
    BTN_CART = "btn-open-cart"

    def row_id(self, product_id: str) -> str:
        return f"catalog-row-{product_id}"

    def wait_catalog(self) -> None:
        self.wait_visible(self.SCREEN)

    def open_cart(self) -> None:
        self.find(self.BTN_CART).click()

    def open_product(self, product_id: str) -> None:
        self.wait_visible(self.row_id(product_id)).click()

    def scroll_until_product(self, product_id: str, max_scrolls: int = 45) -> None:
        """Scroll no catálogo até o `testID` catalog-row-<id> existir."""
        rid = self.row_id(product_id)
        for _ in range(max_scrolls):
            try:
                el = self.driver.find_element(AppiumBy.ACCESSIBILITY_ID, rid)
                if el.is_displayed():
                    return
            except NoSuchElementException:
                pass
            self.scroll_gesture("down", percent=2.2)
        raise AssertionError(f"Produto não encontrado após scroll: {product_id}")

    def long_press_favorite(self, product_id: str) -> None:
        el = self.wait_visible(self.row_id(product_id))
        self.long_press_element(el)
