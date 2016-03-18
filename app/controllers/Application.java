package controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.game.Game;
import models.game.Rules;
import models.player.MachinePlayer;
import models.player.Player;
import models.table.Table;
import org.apache.commons.lang3.StringUtils;
import play.mvc.*;

import views.html.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Application extends Controller {

  final static Map<String, Game> gameMap = new HashMap<String, Game>();
  final static ObjectMapper object = new ObjectMapper();

  public static Result index() {
    return ok(index.render("Your new application is ready."));
  }

  public static Result poker() {
    return ok(poker.render());
  }

  public static Result createGame(int numTables, int maxPlayers, int minimumBet) throws JsonProcessingException {
    String uuid = Game.generateGameUUID(gameMap.keySet());
    Rules rules = new Rules(numTables, maxPlayers, minimumBet);
    Game game = new Game(uuid, rules);
    gameMap.put(uuid, game);
    return ok(object.writeValueAsString(game));
  }

  public static Result createPlayer(String gameId, String tableId, double money) throws JsonProcessingException {
    Game game = gameMap.get(gameId);
    Player player = Game.generateMachinePlayer(game, money);

    for (Table table : game.getTables()) {
      if (table.getId().equals(tableId)) {
        table.getPlayers().add(player);
        break;
      }
    }

    ObjectMapper object = new ObjectMapper();
    return ok(object.writeValueAsString(game));
  }

  @BodyParser.Of(BodyParser.Json.class)
  public static Result updateGame() throws IOException {
    JsonNode json = request().body().asJson();

    String data = json.toString();
    if (StringUtils.isNotBlank(data)) {
      Game game = object.readValue(data, Game.class);
      if (gameMap.containsKey(game.getId())) {
        gameMap.put(game.getId(), game);
      }
    }

    return ok();
  }

  public static Result getGame(String gameId) throws JsonProcessingException {
    if (gameMap.containsKey(gameId)) {
      return ok(object.writeValueAsString(gameMap.get(gameId)));
    } else {
      return notFound("{}");
    }
  }
}
