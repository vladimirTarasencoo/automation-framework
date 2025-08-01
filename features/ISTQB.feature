Feature: Tests in order of excel file

  @RegisterUser
  @Positive
  Scenario: Login and creation positives verification
    Given User navigate to Login
    Then User try to enter with uppercase mail
    Then User click login twice
    Then User login by pushing Enter
    When User create new contact
    Then User edit new contact
    Then User delete new contact


  Scenario: Negatives
    Given User navigate to Registration




#  @Negative
#  @Positive
#  @RegisterUser