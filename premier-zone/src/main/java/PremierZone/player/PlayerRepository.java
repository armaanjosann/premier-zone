package PremierZone.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository 
public interface PlayerRepository extends JpaRepository<Player, Integer>{ // Integer = the type of the id field
    void deleteByName(String playerName); // find player by anme and delete

    Optional<Player> findByName(String name);

}
