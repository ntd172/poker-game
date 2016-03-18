package models.player;

/***
 * Created by Do Nguyen on 3/17/16.
 */
@Deprecated
public class HumanPlayer extends Player {
  public HumanPlayer(String id, String name, double money) {
    super(id, name, money, PlayerType.HUMAN);
  }
}
