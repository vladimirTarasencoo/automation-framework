Feature: Login Form

  @test
  Scenario: User can log in without password
    Given I navigate to Login
    When I login incorrect
    Then I should see the error message: "Success Login!"