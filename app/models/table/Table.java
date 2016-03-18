package models.table;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import models.player.Player;

import java.util.LinkedList;
import java.util.List;

/***
 * Created by Do Nguyen on 3/17/16.
 *
 * Casino Table
 */
public class Table {
  private String id;
  @JsonProperty("players")
  private List<Player> players = new LinkedList<Player>();;

  @JsonCreator
  public Table(@JsonProperty("id") String id) {
    this.id = id;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public List<Player> getPlayers() {
    return players;
  }

  public void setPlayers(List<Player> players) {
    this.players = players;
  }
}
