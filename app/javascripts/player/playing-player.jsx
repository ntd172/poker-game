var Util = require('../util.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      player: this.props.player
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      player: nextProps.player
    })
  },

  render: function() {
    var player = this.state.player;

    var betContent = (<td>{player.bet}</td>);
    if (player.type === "HUMAN") {
      betContent = (<td><input style={{width: 50}} onChange={this.onChange} value={player.bet} /></td>);
    }

    return(
      <tr>
        <td><button
          disabled={this.props.gameStatus !== Util.GAME_STATUS.SEATING}
          onClick={this.props.removePlayer}>Leave</button>
        </td>
        <td>{player.name}</td>
        <td>${player.money}</td>
        {betContent}
        <td>{player.hand != '' ? player.showHand  ? player.hand : '** ** ** ** **' : ""}</td>
      </tr>
    );
  },

  onChange: function(event) {
    var value = event.target.value;
    var player = this.state.player;

    player.money += player.bet;
    player.bet = Number.parseFloat(value);
    if (isNaN(player.bet)) {
      player.bet = 0;
    }
    player.money -= player.bet;

    this.setState({
      player: player
    });
  }
});