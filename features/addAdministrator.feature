Feature: TM4J2GIT - Add new Administrator User
  @TestCaseKey=ATS-T752
  Scenario: TM4J2GIT - Add new Administrator User

    Given James is logged into the application
    Given James as an administrator is on the TM4J2GIT admin page
    When James add a new administrator by account
    Then James check the user name is listed in Administrators list

