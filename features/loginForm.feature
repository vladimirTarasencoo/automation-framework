Feature: Union

  Background:
    Given I navigate to login

  @test
  Scenario Outline: Log in
    When I log in as "<login>" with "<password>"
    Then I should see "<expected_message>"

    Examples:
      | login         | password       | expected_message               |
      | student       | Password123    | Logged In Successfully         |
      |               |                | Your username is invalid!      |
      |               | Password123    | Your username is invalid!      |
      | student       |                | Your password is invalid!      |
      | student       | Password1234   | Your password is invalid!      |
      | studentt      | Password123    | Your username is invalid!      |
