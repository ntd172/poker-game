package models.player;

/***
 * Created by Do Nguyen on 3/17/16.
 *
 *
 * TODO: need to figure out how to construct serialize/deserialize JSON with abstracts class
 * that's why MachinePlayer and HumanPlayer are not able to be used
 */
@Deprecated
public class MachinePlayer extends Player {
  public MachinePlayer(String id, String name, double money) {
    super(id, name, money, PlayerType.MACHINE);
  }
}
