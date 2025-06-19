Feature: Login Form

  @test
  Scenario: User can log in without password
    Given I navigate to Login
    When I login incorrect
    Then I should see the error message: "Your username is invalid!"
    When I login correct
    Then I should see text: "Logged In Successfully"