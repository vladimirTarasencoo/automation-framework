Feature: User Navigation with Auth

  # Регистрация 1 раз через хук

  Background:
    Given user opens Login page
    And enter with his data

  Scenario: View contact list
    Given user opens List page

  Scenario: Add new contact
    Given user opens AddContact page
    Then user add new contacts

  Scenario: Check added contact
    Given user opens List page
    Then user check added contact
    Then user delete added contact

