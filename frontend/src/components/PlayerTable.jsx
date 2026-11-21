// PlayerTable shows the list of players in a table.
// App.jsx gives it "players" - an array (list) of player objects,
// already filtered and sorted.
// Each player looks like: { id: 4, name: "Bukayo Saka", team: "Arsenal", gls: 4, ... }

function PlayerTable({ players }) {
  // If no players match the filters, show a message instead of an empty table
  if (players.length === 0) {
    return <p>No players match your filters.</p>
  }

  return (
    <div>
      <p>Showing {players.length} players</p>

      {/* The wrapper lets the table scroll sideways on small screens */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Team</th>
              <th>Pos</th>
              <th>Age</th>
              <th>Starts</th>
              <th>Mins</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>G+A</th>
              <th>xG</th>
              <th>xAG</th>
            </tr>
          </thead>

          <tbody>
            {/* .map() goes through every player and makes one row for each.
                "index" is the player's place in the list (0, 1, 2...) */}
            {players.map((player, index) => (
              // React needs a unique "key" for each row - the database id is perfect
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td className="name">{player.name}</td>
                {/* "Manchester-City" -> "Manchester City" */}
                <td>{player.team.replaceAll('-', ' ')}</td>
                <td>{player.pos}</td>
                {/* ?? means "if this is empty (null), show '-' instead" */}
                <td>{player.age ?? '-'}</td>
                <td>{player.starts ?? '-'}</td>
                <td>{player.min ?? '-'}</td>
                <td>{player.gls ?? '-'}</td>
                <td>{player.ast ?? '-'}</td>
                <td className="highlight">{player.ga}</td>
                <td>{player.xg ?? '-'}</td>
                <td>{player.xag ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlayerTable
