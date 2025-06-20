Feature: Union

  @negative
  Scenario Outline: Invalid login attempts
    Given I navigate to Login
    When I try to log in with "<login>" and "<password>"
    Then I should see the "<result>"

    Examples:
      | login    | password     | result                     |
      | studen   | Password123  | Your username is invalid!  |
      | student  | Password1234 | Your password is invalid!  |
      |          | Password123  | Your username is invalid!  |
      | student  |              | Your password is invalid!  |
      |          |              | Your username is invalid!  |
