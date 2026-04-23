"""Nível 3: WebView/contexto, deep link, base para execução paralela (xdist)."""

from __future__ import annotations

import allure
import pytest

from pages.cart_page import CartPage
from pages.catalog_page import CatalogPage
from pages.checkout_page import CheckoutPage
from pages.login_page import LoginPage
from pages.product_page import ProductPage
from utils.deeplink import adb_open_url


@pytest.mark.level3
@pytest.mark.android
@allure.feature("Nível 3")
@allure.story("Troca de contexto NATIVE / WEBVIEW")
def test_checkout_webview_contexto_pagamento(driver) -> None:
    LoginPage(driver).login_demo()
    cat = CatalogPage(driver)
    cat.wait_catalog()
    cat.open_product("expresso-03")
    prod = ProductPage(driver)
    prod.wait_product()
    prod.add_to_cart()
    cart = CartPage(driver)
    cart.wait_visible(cart.SCREEN)
    cart.go_checkout()

    co = CheckoutPage(driver)
    co.fill_address("Rua Teste", "100", "São Paulo")
    co.open_payment_webview()
    assert any("WEBVIEW" in (c or "").upper() for c in driver.contexts)
    co.switch_to_webview()
    co.confirm_pay_in_web_dom()
    co.switch_to_native()
    co.close_payment_webview()


@pytest.mark.level3
@pytest.mark.android
@allure.feature("Nível 3")
@allure.story("Deep link")
def test_deep_link_abre_detalhe_produto(driver) -> None:
    LoginPage(driver).login_demo()
    CatalogPage(driver).wait_catalog()
    adb_open_url(driver, "brewtime://product/gelado-17")
    ProductPage(driver).wait_product()
    assert ProductPage(driver).find("text-product-name").is_displayed()


@pytest.mark.level3
@pytest.mark.android
@allure.feature("Nível 3")
@allure.story("Paralelo")
def test_worker_udid_isolado(driver) -> None:
    """
    Smoke para xdist: cada worker recebe UDID distinto (ver conftest).
    Rode: `pytest -n 2 tests/test_level3_avancado.py::test_worker_udid_isolado`.
    """
    udid = driver.capabilities.get("appium:udid") or driver.capabilities.get("udid")
    assert udid
