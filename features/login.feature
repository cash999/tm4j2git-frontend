Feature: TM4J2GIT  - Login

  In order to use the TM4J2GIT synchronizer
  As a user of the application
  I would like to login into TM4J2GIT Synchronizer


    @TestCaseKey=ATS-T751
    Scenario: James login into TM4J2GIT

      Given James decides to use TM4J2GIT Synchronizer
      When James enters user name and password
      Then James should see the synchronisation task
