'use strict';

import assert from 'assert';

module.exports = function() {
  this.When(/^I start the game$/, function (callback) {
    this.startGame(function(response) {
     assert.equal(200, response.statusCode);
     this.response = response;
     this.gameId   = response.result.code;
     callback(); 
    }.bind(this));
  });

  this.Then(/^a game should be created$/, function (callback) {
    assert.ok(this.app.app.games[this.gameId]);
    callback();
  });

  this.Then(/^I should be provided with a game id code$/, function (callback) {
    assert.ok(this.response.result.code);
    callback();
  });

  this.Given(/^that I have the game id code$/, function (callback) {
    this.gameId = 1;
    callback();
  });

  this.Given(/^that there is a game$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.When(/^I join the game$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^I should be added to the game$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });
};
