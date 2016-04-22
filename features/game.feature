Feature: 
  As a user I want to be able to play the game.

  Scenario: I should be able to create a game
    When I start the game
    Then a game should be created
     And I should be provided with a game id code

  Scenario: I should be able to join a game
   Given that there is a game
     And that I have the game id code
    When I join the game
    Then I should be added to the game

