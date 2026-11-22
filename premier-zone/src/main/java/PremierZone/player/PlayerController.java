package PremierZone.player;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@RestController // marks the calass as a Spring MVC controller where every method returns a domain object of a view.
@RequestMapping(path = "api/v1/player") // the url
// Which sites may call this API from a browser is set in CorsConfig.java (app.cors.allowed-origins).
public class PlayerController {
    private final PlayerService playerService;

    // app.read-only (READ_ONLY env var): blocks the write endpoints on public deployments.
    @Value("${app.read-only:false}")
    private boolean readOnly;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers(
        @RequestParam(required = false) String team,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String position,
        @RequestParam(required = false) String nation) {

            if(team != null && position!= null) {
                return playerService.getPlayersByTeamAndPosition(team, position);
            }
            else if( team != null) {
                return playerService.getPlayersFromTeam(team);
            }
            else if(name != null) {
                return playerService.getPlayersByName(name);
            }
            else if (position != null) {
                return playerService.getPlayersByPosition(position);
            }
            else if (nation != null) {
                return playerService.getPlayersByNation(nation);
            }
            else {
                return playerService.getPlayers();
            }
        }

    
    @PostMapping 
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) { 
        if (readOnly) return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        Player createdPlayer = playerService.addPlayer(player);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @PutMapping 
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player) {
        if (readOnly) return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        Player resultPlayer = playerService.updatePlayer(player);
        if(resultPlayer != null) {
            return new ResponseEntity<>(resultPlayer, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @DeleteMapping("/{playerName}") // name of player we are deleting
    public ResponseEntity<String> deletePlayer(@PathVariable String playerName) {
        if (readOnly) return new ResponseEntity<>("This deployment is read-only", HttpStatus.FORBIDDEN);
        playerService.deletePlayer(playerName);
        return new ResponseEntity<>("Player deleted successfully", HttpStatus.OK);
    }
}
