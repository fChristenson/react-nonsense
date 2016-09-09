'use strict';

import app    from '../../app';

const World = function() {
    this.app       = app;
    this.startGame = function(callback){
        var req = {
            method: 'POST',
            url: '/invite',
            payload: {
                code: 1
            }
        };
        app.inject(req, callback);
    };
};

module.exports = function() {
    this.World = World;
};

