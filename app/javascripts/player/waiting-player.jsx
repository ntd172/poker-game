module.exports = React.createClass({
  getInitialState: function() {
    return {
      tableId: this.props.tables[0].id
    };
  },

  render: function() {
    var tableOptions = [];
    var tables = this.props.tables;
    for (var i = 0; i < tables.length; i++) {
      tableOptions.push(<option key={tables[i].id}>{tables[i].id}</option>)
    }
    return(
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.money}</td>
        <td>
          <select value={this.state.tableId} onChange={this.optionSelected}>
            {tableOptions}
          </select>
        </td>
        <td><button onClick={this.onClick}>Join</button></td>
      </tr>
    );
  },

  optionSelected: function(event) {
    this.setState({
      tableId: event.target.value
    })
  },

  onClick: function() {
    this.props.joinTable(this.state.tableId);
  }
});