Feature: UiTests

  @test
  Scenario: Test
    Given I navigate to login
    When I create new user
    Then I create new contact and check it
    Then I delete if it exists
