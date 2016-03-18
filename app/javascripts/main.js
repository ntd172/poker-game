'use strict';

var Game = require('./game/game.jsx');
var ReactDom = require('react-dom');

ReactDom.render((<Game />), document.getElementById('main-content'));
