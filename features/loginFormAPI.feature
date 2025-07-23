Feature: User Navigation with Auth

  @Negative
  Scenario Outline: User attempts to register without some fields
    When user attempts to register without '<param>'
    Then '<errorMessage>' message is displayed
    Examples:
      | param     | errorMessage                                                     |
      | firstname | User validation failed: firstName: Path `firstName` is required. |
      | lastname  | User validation failed: lastName: Path `lastName` is required.   |
      | email     | User validation failed: email: Email is invalid                  |
      | password  | User validation failed: password: Path `password` is required.   |

  @RegisterUser
  @Negative
  Scenario: Check user with same email cannot be registered twice
    When user attempts to register with existing email
    Then 'Email address is already in use' message is displayed

  @RegisterUser
  @Negative
  Scenario Outline: Check record cannot be created without Firstname or Lastname
    When user attempts to create contact without '<param>'
    Then '<errorMessage>' message is displayed

    Examples:
      | param     | errorMessage                                                        |
      | firstname | Contact validation failed: firstName: Path `firstName` is required. |
      | lastname  | Contact validation failed: lastName: Path `lastName` is required.   |
      | both      | Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required. |

    @RegisterUser
    @Positive
    Scenario: Add and delete new contact
    When user add new contacts
      | FirstName | LastName | DoB        | Email              | Phone      | Address1 | Address2     | City        | SoP        | PostCode | Country |
      | Vlad      | svsese   | 2018-02-02 | vdrvsefc@dsvdr.com | 9998887766 | dvdjhrvd | lkjnvdlkjrnv | Los Angeles | California | 20220    | Cricova |
      | Svse      | kjvnsd   |            | vdrvsefc@dsvdr.com |            | dvdjhrvd | lkjnvdlkjrnv |             | California |          |         |
    Then user checks new records
    When user delete created contacts

  @RegisterUser
  @Positive
  Scenario: Check created records can be edited
    When user add new contacts
      | FirstName | LastName | DoB        | Email              | Phone      | Address1 | Address2     | City        | SoP        | PostCode | Country |
      | Vlad      | svsese   | 2018-02-02 | vdrvsefc@dsvdr.com | 9998887766 | dvdjhrvd | lkjnvdlkjrnv | Los Angeles | California | 20220    | Cricova |
      | Svse      | kjvnsd   |            | vdrvsefc@dsvdr.com |            | dvdjhrvd | lkjnvdlkjrnv |             | California |          |         |
    Then user checks new records
    When user edit record [1]
      | FirstName | LastName | DoB        | Email              | Phone      | Address1 | Address2     | City        | SoP        | PostCode | Country |
      | Vlad      | vdrvdr   | 2018-02-02 | vdrvsefc@dsvdr.com | 9998887766 | dvdjhrvd | lkjnvdlkjrnv | Los Angeles | California | 20220    | Cricova |
