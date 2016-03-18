package models.player;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/***
 * Created by Do Nguyen on 3/17/16.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Player {
  private String id;
  private String name;
  private double money;
  private PlayerType type;
  @JsonProperty("hand")
  private String hand;
  @JsonProperty("bet")
  private double bet;

  public PlayerType getType() {
    return type;
  }

  public void setType(PlayerType type) {
    this.type = type;
  }

  public enum PlayerType {
    HUMAN,
    MACHINE
  }

  @JsonCreator
  public Player(@JsonProperty("id") String id, @JsonProperty("name") String name, @JsonProperty("money") double money, @JsonProperty("type") PlayerType type) {
    this.id = id;
    this.name = name;
    this.money = money;
    this.type = type;

    this.hand = "";
    this.bet = 0;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public double getMoney() {
    return money;
  }

  public void setMoney(double money) {
    this.money = money;
  }
}
