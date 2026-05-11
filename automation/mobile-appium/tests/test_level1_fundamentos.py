"""Nível 1: login (sucesso/erro) e navegação por abas."""

from __future__ import annotations

import allure
import pytest
from appium.webdriver.common.appiumby import AppiumBy
from selenium.common.exceptions import NoSuchElementException

from pages.catalog_page import CatalogPage
from pages.login_page import LoginPage
from pages.tabs_page import TabsPage


@pytest.mark.level1
@pytest.mark.android
@allure.feature("Nível 1")
@allure.story("Login")
def test_login_campos_vazios_mostram_erro(driver) -> None:
    login = LoginPage(driver)
    login.wait_visible(LoginPage.SCREEN)
    login.find(LoginPage.BTN_LOGIN).click()
    login.wait_visible(LoginPage.TEXT_ERROR)


@pytest.mark.level1
@pytest.mark.android
@allure.feature("Nível 1")
@allure.story("Login")
def test_login_credenciais_invalidas(driver) -> None:
    login = LoginPage(driver)
    login.login_invalid("x@y.z", "errado")
    login.wait_visible(LoginPage.TEXT_ERROR)


@pytest.mark.level1
@pytest.mark.android
@allure.feature("Nível 1")
@allure.story("Login")
def test_login_sucesso_demo(driver) -> None:
    login = LoginPage(driver)
    login.login_demo()
    CatalogPage(driver).wait_catalog()


@pytest.mark.level1
@pytest.mark.android
@allure.feature("Nível 1")
@allure.story("Abas")
def test_navegacao_abas_home_favoritos_perfil(driver) -> None:
    LoginPage(driver).login_demo()
    CatalogPage(driver).wait_catalog()
    tabs = TabsPage(driver)
    tabs.go_favorites()
    tabs.wait_visible("screen-favorites")
    tabs.go_profile()
    tabs.wait_visible("screen-profile")
    tabs.go_home()
    tabs.wait_visible("screen-catalog")


@pytest.mark.level1
@pytest.mark.android
@allure.feature("Nível 1")
@allure.story("Seletores")
def test_xpath_exemplo_titulo_login(driver) -> None:
    """
    XPath é frágil (layout/texto); use só quando não houver testID.
    Accessibility ID continua sendo o padrão do projeto.
    """
    LoginPage(driver).wait_visible(LoginPage.SCREEN)
    el = driver.find_element(AppiumBy.XPATH, "//*[@text='BrewTime']")
    assert el.is_displayed()


@pytest.mark.level1
@pytest.mark.android
def test_login_social_google_abre_sessao(driver) -> None:
    login = LoginPage(driver)
    login.tap_google()
    with pytest.raises(NoSuchElementException):
        login.find(LoginPage.SCREEN)
