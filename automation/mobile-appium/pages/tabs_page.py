from __future__ import annotations

from pages.base_page import BasePage


class TabsPage(BasePage):
    """Abas inferiores: testIDs via tabBarButtonTestID → accessibility no Android."""

    TAB_HOME = "tab-home"
    TAB_FAVORITES = "tab-favorites"
    TAB_PROFILE = "tab-profile"

    def go_home(self) -> None:
        self.find(self.TAB_HOME).click()

    def go_favorites(self) -> None:
        self.find(self.TAB_FAVORITES).click()

    def go_profile(self) -> None:
        self.find(self.TAB_PROFILE).click()
