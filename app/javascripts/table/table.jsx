var PlayingPlayer = require('../player/playing-player.jsx');
var Stats = require('./stats.jsx');
var Util = require('../util.js');
var $ = require('jQuery');
var poker = require('./cards/poker.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      players: this.props.players,
      winner: null,
      winningMoney: 0,
      dealerHand: '',
      gameStatus: Util.GAME_STATUS.SEATING
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      players: nextProps.players
    })
  },

  render: function() {
    var rows = [];
    var players = this.state.players;

    for (var i = 0; i < players.length; i++) {
      rows.push(<PlayingPlayer
        key={players[i].id}
        player={players[i]}
        removePlayer={this.removePlayer.bind(this, players[i])}
        onHumanBet={this.onHumanBet}
        gameStatus={this.state.gameStatus}
      />)
    }

    return (
      <div>
        <table >
          <thead>
            <tr>
              <th>
                <button
                onClick={this.removeAll}
                disabled={this.state.players.length == 0 || this.state.gameStatus !== Util.GAME_STATUS.SEATING}>
                  All Leave
                </button>
              </th>
              <th>Name</th>
              <th>Money</th>
              <th>Bet</th>
              <th>Hand</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <br />
        <Stats
          rules={this.props.rules}
          winner={this.state.winner}
          dealerHand={this.state.dealerHand}
          winningMoney={this.state.winningMoney}
        />
        <br />
        <div>
          <button disabled={this.state.players.length == this.props.rules.maxPlayers && this.state.gameStatus === Util.GAME_STATUS.SEATING}
                  onClick={this.addPlayer} style={{marginRight: 10}}>Add a Player
          </button>
          <button disabled={!this.isAbleToDeal()} onClick={this.dealGame} style={{marginRight: 10}}>Deal</button>
          <button disabled={this.state.players.length < 2} onClick={this.betGame} style={{marginRight: 10}}>Bet</button>
          <button disabled={!this.isPlayable()} onClick={this.playGame} style={{marginRight: 10}}>Play</button>
        </div>
      </div>
    );
  },

  addPlayer: function() {
    // TODO: make a request to the server to ask for id machine player
    // this.props.join(player, this.props.id)
    $.post('/createPlayer?gameId=' + this.props.gameId + '&tableId=' + this.props.id +  '&money=1000&prefixName=Machine', function(data) {
      var game = JSON.parse(data);
      this.props.update(game);
    }.bind(this));
  },

  removePlayer: function(player) {
    player.money += player.bet;
    player.bet = 0;
    player.hand = '';

    this.props.leave(player);
  },

  removeAll: function() {
    var players = this.props.players;
    for (var i = players.length - 1; i >= 0; i--) {
      this.props.leave(players[i]);
    }
  },

  betGame: function() {
    var players = this.state.players;
    for (var i = 0; i < players.length; i++) {
      if (players[i].type !== 'HUMAN') {
        players[i].money += players[i].bet;
        players[i].bet = Util.randomRange(this.props.rules.minimumBet, players[i].money);
        players[i].money -= players[i].bet;
      }
    }

    this.setState({
      players: players
    })
  },

  onHumanBet: function(player) {
    var players = this.state.players;

    for (let i = 0; i < players.length; i++) {
      if (players[i].id == player.id) {
        players[i] = player;
        break;
      }
    }
    this.setState({
      players: this.state.players
    })
  },

  isPlayable: function() {
    var players = this.state.players;
    var countPlayablePlayers = 0;
    var totalCountPlayablePlayers = 0;

    for (var i = 0; i < players.length; i++) {
      if (players[i].bet >= this.props.rules.minimumBet) {
        countPlayablePlayers += 1;
      }

      if (players[i].money  + players[i].bet >= this.props.rules.minimumBet) {
        totalCountPlayablePlayers += 1;
      }
    }

    return countPlayablePlayers == totalCountPlayablePlayers;
  },

  playGame: function() {
    var players = this.state.players;
    var winner;
    for (let i = 0; i < players.length; i++) {
      if (players[i].bet > 0) {
        winner = players[i];
        players[i].showHand = true;
      }
    }

    //var winner = players[Math.floor(Math.random() * players.length)];
    var winningMoney = -winner.bet;
    for (let i = 0; i < players.length; i++) {
      winningMoney += players[i].bet;
      winner.money += players[i].bet;
      players[i].bet = 0;
    }

    this.props.play({
      id: this.props.id,
      players: players
    });

    this.setState({
      players: players,
      winner: winner,
      winningMoney: winningMoney,
      gameStatus: Util.GAME_STATUS.SEATING
    });
  },

  isAbleToDeal: function() {
    var players = this.state.players;
    var countPlayablePlayers = 0;
    for (var i = 0; i < players.length; i++) {
      if (players[i].money >= this.props.rules.minimumBet) {
        countPlayablePlayers += 1;
      }
    }
    return countPlayablePlayers >= 2;
  },

  dealGame: function() {
    var players = this.state.players;
    var deck = poker.getADeck();

    for (let i = 0; i < players.length; i++) {
      if (players[i].money + players[i].bet > this.props.rules.minimumBet) {
        players[i].hand = poker.deal(deck);
        players[i].showHand = players[i].type === 'HUMAN';
      } else {
        players[i].hand = "";
        players[i].showHand = false;
      }
    }

    var dealerHand = poker.deal(deck);

    this.setState({
      players: players,
      dealerHand: dealerHand,
      gameStatus: Util.GAME_STATUS.STARTED
    })
  }
});