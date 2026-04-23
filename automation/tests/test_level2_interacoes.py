"""Nível 2: scroll até produto, long press (favoritar), swipe no carrinho."""

from __future__ import annotations

import allure
import pytest

from pages.cart_page import CartPage
from pages.catalog_page import CatalogPage
from pages.login_page import LoginPage
from pages.product_page import ProductPage
from pages.tabs_page import TabsPage


TARGET_PRODUCT = "gelado-17"


@pytest.mark.level2
@pytest.mark.android
@allure.feature("Nível 2")
@allure.story("Scroll no catálogo")
def test_scroll_ate_produto_especifico(driver) -> None:
    LoginPage(driver).login_demo()
    cat = CatalogPage(driver)
    cat.wait_catalog()
    cat.scroll_until_product(TARGET_PRODUCT)
    cat.open_product(TARGET_PRODUCT)
    ProductPage(driver).wait_product()


@pytest.mark.level2
@pytest.mark.android
@allure.feature("Nível 2")
@allure.story("Long press favoritar")
def test_long_press_favoritar_expresso_01(driver) -> None:
    LoginPage(driver).login_demo()
    cat = CatalogPage(driver)
    cat.wait_catalog()
    cat.scroll_until_product("expresso-01")
    cat.long_press_favorite("expresso-01")
    cat.find("fav-badge-expresso-01")
    TabsPage(driver).go_favorites()
    TabsPage(driver).wait_visible("fav-row-expresso-01")


@pytest.mark.level2
@pytest.mark.android
@allure.feature("Nível 2")
@allure.story("Swipe excluir carrinho")
def test_swipe_remove_item_carrinho(driver) -> None:
    LoginPage(driver).login_demo()
    cat = CatalogPage(driver)
    cat.wait_catalog()
    cat.open_product("latte-02")
    prod = ProductPage(driver)
    prod.wait_product()
    prod.add_to_cart()
    cart = CartPage(driver)
    cart.wait_visible(cart.SCREEN)
    cart.swipe_row_left_to_reveal_delete(0)
    cart.tap_delete(0)
    cart.wait_visible("screen-cart-empty")
