Feature: TM4J2GIT - Add feature

  In order to have BDD scenarios synchronised
  As a user of the application
  I would like to generate my own synchronisation task

  Scenario: James generates a synchronisation task

    Given James is logged into the application
    And James is on the Add Sync page
    When James enter a new Sync
    Then James should see the synchronisation task
