Feature: fumaça HTTP (exemplo)

  Background:
    * url baseUrl

  Scenario: GET público responde 200
    Given path '/get'
    When method get
    Then status 200
    And match responseHeaders['Content-Type'] contains 'json'
