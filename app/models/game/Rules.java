package models.game;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/***
 * Created by Do Nguyen on 3/17/16.
 */
public class Rules {
  private int maxPlayers;
  private int minimumBet;
  private int numTables;

  @JsonCreator
  public Rules(@JsonProperty("numTables") int numTables, @JsonProperty("maxPlayers") int maxPlayers, @JsonProperty("minimumBet") int minimumBet) {
    this.numTables = numTables;
    this.maxPlayers = maxPlayers;
    this.minimumBet = minimumBet;
  }

  public int getMaxPlayers() {
    return maxPlayers;
  }

  public void setMaxPlayers(int maxPlayers) {
    this.maxPlayers = maxPlayers;
  }

  public int getMinimumBet() {
    return minimumBet;
  }

  public void setMinimumBet(int minimumBet) {
    this.minimumBet = minimumBet;
  }

  public int getNumTables() {
    return numTables;
  }

  public void setNumTables(int numTables) {
    this.numTables = numTables;
  }
}
