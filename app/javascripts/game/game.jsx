var Table = require('../table/table.jsx');
var WaitingPlayer = require('../player/waiting-player.jsx');
var Util = require('../util.js');
var $ = require('jQuery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      id: "",
      waitingPlayers: [],
      rules: {
        numTables: 0,
        maxPlayers: 0,
        minimumBet: 0
      },
      tables: []
    }
  },

  componentDidMount: function() {
    // TODO: using routing in react instead of doing routing manual with params
    var params = Util.QueryString();
    if (params['gameId'] !== undefined) {
      $.get('/getGame?gameId=' + params['gameId'], function(data) {
        var obj = JSON.parse(data);
        this.update(obj);
      }.bind(this));
    } else {
      $.get('/create?numTables=' + (params['numTables'] || 3) + '&maxPlayers=' + (params['maxPlayers'] || 5) + '&minimumBet=' + (params['minimumBet'] || 10), function(data) {
        var obj = JSON.parse(data);
        this.update(obj);
      }.bind(this))
    }
  },

  componentDidUpdate: function() {
    $.ajax({
      type: "POST",
      url: '/updateGame',
      data:  JSON.stringify(this.state),
      contentType: 'application/json'
    });
  },

  render: function() {

    var waitingPlayers = this.state.waitingPlayers;
    var tables = this.state.tables;

    var tablesRender = [];
    for (var i = 0; i < tables.length; i++) {
      tablesRender.push(
        <div key={tables[i].id} style={{width: Math.floor(100/tables.length) + '%', float: 'left'}}>
          <Table
            gameId={this.state.id}
            id={tables[i].id}
            players={tables[i].players}
            leave={this.leave}
            join={this.join}
            rules={this.state.rules}
            play={this.play}
            update={this.update}
          />
        </div>
      )
    }

    var rows = [];
    for (var i = 0; i < waitingPlayers.length; i++) {
      rows.push(<WaitingPlayer
        key={waitingPlayers[i].id}
        name={waitingPlayers[i].name}
        money={waitingPlayers[i].money}
        joinTable={this.join.bind(this, waitingPlayers[i])}
        tables={tables}
      />);
    }

    return (
      <div>
        <div>
          Game ID: <a  target="_blank" href={"/getGame?gameId=" + this.state.id}>{this.state.id}</a>
        </div>
        <br />

        {tablesRender}

        <div id="waiting-list-players" style={{width: '100%', float: 'left', marginTop: 20}}>
          Waiting List
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Money</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  },

  leave: function(player) {
    var tables = this.state.tables;

    for (var i = 0; i < tables.length; i++) {
      var found = false;
      var players = tables[i].players;
      for (var j = 0; j < players.length; j++) {
        if (String(players[j].id) == String(player.id)) {
          players.splice(j, 1);
          found = true;
          break;
        }
      }
      if (found) break;
    }

    var waitingPlayers = this.state.waitingPlayers;
    waitingPlayers.push(player);

    this.setState({
      tables: tables,
      waitingPlayers: waitingPlayers
    });
  },

  join: function(player, tableId) {

    var tables = this.state.tables;
    var waitingPlayers = this.state.waitingPlayers;
    var added = false;

    for (var i = 0; i < tables.length; i++) {
      if (String(tables[i].id) === String(tableId)) {

        if (tables[i].players.length < this.state.rules.maxPlayers) {
          added = true;
          tables[i].players.push(player);
          // adding random bet for player
          player.bet = 0;
          player.hand = "";
        }

        break;
      }
    }

    for (var i = 0; i < waitingPlayers.length; i++) {
      if (String(waitingPlayers[i].id) === String(player.id) && added) {
        waitingPlayers.splice(i, 1);
        break;
      }
    }

    this.setState({
      tables: tables,
      waitingPlayers: waitingPlayers
    })
  },

  play: function(table) {
    var tables = this.state.tables;
    for (let i = 0; i < tables.length; i++) {
      if (tables[i].id === table.id) {
        tables[i] = table;
      }
    }
    this.setState({
      tables: tables
    });
  },

  update: function(data) {
    this.setState(data);
  }
});