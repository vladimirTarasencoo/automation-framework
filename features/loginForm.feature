Feature: User Navigation with Auth

  Background:
    Given create new account

  @Negative
  Scenario: Check user with same email cannot be registered twice
    Given user opens Registration page
    When user attempts to register with existing email
    Then 'Email address is already in use' message is displayed

  @Negative
  Scenario Outline: Check record cannot be created without Firstname or Lastname
    Given user opens AddContact page
    When user attempts to create contract without '<param>'
    Then '<errorMessage>' message is displayed

    Examples:
      | param     | errorMessage                                                        |
      | firstname | Contact validation failed: firstName: Path `firstName` is required. |
      | lastname  | Contact validation failed: lastName: Path `lastName` is required.   |


  @Positive
  Scenario: Add and delete new contact
    Given user opens AddContact page
    When user add new contacts
      | FirstName | LastName | DoB        | Email              | Phone      | Address1 | Address2     | City        | SoP        | PostCode | Country |
      | Vlad      | svsese   | 2018-02-02 | vdrvsefc@dsvdr.com | 9998887766 | dvdjhrvd | lkjnvdlkjrnv | Los Angeles | California | 20220    | Cricova |
    Then user checks new records
    When user delete created contracts

  @Positive
  Scenario: Check created records can be edited
    Given user opens AddContact page
    When user add new contacts
      | FirstName | LastName | DoB        | Email              | Phone      | Address1 | Address2     | City        | SoP        | PostCode | Country |
      | Vlad      | svsese   | 2018-02-02 | vdrvsefc@dsvdr.com | 9998887766 | dvdjhrvd | lkjnvdlkjrnv | Los Angeles | California | 20220    | Cricova |
      | Svse      | kjvnsd   |            | vdrvsefc@dsvdr.com |            | dvdjhrvd | lkjnvdlkjrnv |             | California |          |         |
    Then user checks new records
    When user edit record [1]
      | FirstName | LastName | DoB        | Email              | Phone      | Address1 | Address2     | City        | SoP        | PostCode | Country |
      | Vlad      | vdrvdr   | 2018-02-02 | vdrvsefc@dsvdr.com | 9998887766 | dvdjhrvd | lkjnvdlkjrnv | Los Angeles | California | 20220    | Cricova |
