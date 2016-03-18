package models.game;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import models.player.Player;
import models.table.Table;

import java.util.*;

/***
 * Created by Do Nguyen on 3/17/16.
 */
public class Game {
  private String id;
  private List<Table> tables = new LinkedList<Table>();;
  private Rules rules;
  private List<Player> waitingPlayers = new LinkedList<Player>();;

  @JsonProperty("nextPlayerId")
  private int nextPlayerId = 0; // using this to create next player ID

  @JsonCreator
  public Game(@JsonProperty("id") String id, @JsonProperty("rules") Rules rules) {
    this.id = id;
    this.rules = rules;
    for (int i = 0; i < rules.getNumTables(); i++) {
      Table table = new Table(String.valueOf(i));
      tables.add(table);
    }

    // TODO: need to pass default values to human player instead of passing them here
    waitingPlayers.add(new Player("human-player", "Human", 1000.00, Player.PlayerType.HUMAN));
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public List<Table> getTables() {
    return tables;
  }

  public void setTables(List<Table> tables) {
    this.tables = tables;
  }

  public static String generateGameUUID(Set<String> uuidList) {
    // TODO: need to make sure uuid is not in uuidList
    UUID uuid = UUID.randomUUID();
    return uuid.toString();
  }

  public Rules getRules() {
    return rules;
  }

  public void setRules(Rules rules) {
    this.rules = rules;
  }

  public List<Player> getWaitingPlayers() {
    return waitingPlayers;
  }

  public void setWaitingPlayers(List<Player> waitingPlayers) {
    this.waitingPlayers = waitingPlayers;
  }

  @JsonIgnore
  public String getNextPlayerId() {
    nextPlayerId += 1;
    return String.valueOf(nextPlayerId);
  }

  public static Player generateMachinePlayer(Game game, double money) {
    String id = game.getNextPlayerId();
    return new Player(id, "Player " + id, money, Player.PlayerType.MACHINE);
  }
}
