module.exports = React.createClass({
  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div>
        <div>Min bet: ${this.props.rules.minimumBet}</div>
        <div>Max Players: {this.props.rules.maxPlayers}</div>
        <div>Last Dealer's Cards: {this.props.dealerHand} </div>
        <div>Last Winner: {this.props.winner ? this.props.winner.name: ''} </div>
        <div>Winning: {this.props.winner ? '$' + this.props.winningMoney: ''}</div>
      </div>
    );
  }
});