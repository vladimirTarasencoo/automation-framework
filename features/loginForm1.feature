Feature: Login Form

  @test
  Scenario: User can log in without password
    Given I navigate to Login
    When I login incorrect
    Then I should see the error message: "Your username is invalid!"
    When I login correct
    Then I should see text: "Logged In Successfully"

  @test
  Scenario: Positive
    Given I navigate to Login
    When I login correct
    Then I should see text: "Logged In Successfully"
    When I click logout
    Then I navigate to Login

  @test
  Scenario: Negative login
    Given I navigate to Login
    When I login incorrect
    Then I should see the error message: "Your username is invalid!"

  @test
  Scenario: Negative password
    Given I navigate to Login
    When I password incorrect
    Then I should see the error message: "Your password is invalid!"

  @test
  Scenario: Empty fields
    Given I navigate to Login
    When I click submit
    Then I should see the error message: "Your username is invalid!"