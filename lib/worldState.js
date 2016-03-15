/**
 * Created by macdja38 on 2016-03-12.
 */
"use strict";

var request = require("request");
var colors = require('colors');

var url = "http://content.warframe.com/dynamic/worldState.php";

var WorldState = function () {
    WorldState.state = false;
    WorldState.lastFech = 0;
    this.get(function (state) {
        WorldState.state = state;
    });
};

WorldState.prototype.get = function get(_callback) {
    if (this.age() > 20000) {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                WorldState.lastFech = Date.now();
                WorldState.status = body;
            } else {
                body = false;
            }
            console.log("Made worldState Request.".green);
            _callback(body);
        });
    }
    else {
        _callback(WorldState.status);
    }
};

WorldState.prototype.age = function age() {
    console.log(("Cache age: " + (Date.now() - WorldState.lastFech)).green);
    return Date.now() - WorldState.lastFech;
};

module.exports = WorldState;