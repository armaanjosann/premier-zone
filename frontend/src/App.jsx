// App.jsx is the main component. It:
//   1. loads all players from our Spring Boot API (once)
//   2. keeps track of the filters the user picked
//   3. filters + sorts the players, then passes them to PlayerTable

import { useState, useEffect } from 'react'
import Filters from './components/Filters.jsx'
import PlayerTable from './components/PlayerTable.jsx'

// The address of our Spring Boot API (PlayerController.java)
const API_URL = 'http://localhost:8081/api/v1/player'

function App() {
  // ---- Data from the API ----
  const [players, setPlayers] = useState([])   // every player from the database
  const [loading, setLoading] = useState(true) // true while we wait for the API
  const [error, setError] = useState('')       // an error message if something goes wrong

  // ---- Filters the user can change ----
  const [search, setSearch] = useState('')              // name search box
  const [team, setTeam] = useState('')                  // '' means "all teams"
  const [position, setPosition] = useState('')          // '' means "all positions"
  const [sortBy, setSortBy] = useState('ga')            // which stat to sort by
  const [regularsOnly, setRegularsOnly] = useState(false) // only show regular starters?

  // useEffect with [] at the end runs ONCE, when the page first loads.
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json()) // turn the response into JavaScript objects
      .then((data) => {
        // Add a "ga" (goals + assists) number to every player.
        // { ...player } copies all the player's existing stats, then we add ga.
        const playersWithGa = data.map((player) => ({
          ...player,
          ga: (player.gls ?? 0) + (player.ast ?? 0),
        }))
        setPlayers(playersWithGa)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load players. Is the Spring Boot backend running?')
        setLoading(false)
      })
  }, [])

  // ---- Filtering ----
  // .filter() keeps only the players where we return true.
  const filteredPlayers = players.filter((player) => {
    // Name search (lowercase both so "SAKA" matches "Saka")
    if (!player.name.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    // Team dropdown
    if (team !== '' && player.team !== team) {
      return false
    }
    // Position dropdown. Some players have two positions like "MF,FW",
    // so we check if their position INCLUDES the one picked.
    if (position !== '' && !player.pos.includes(position)) {
      return false
    }
    // "Regular starters" checkbox: at least 5 starts
    if (regularsOnly && player.starts < 5) {
      return false
    }
    return true // passed every filter, keep this player
  })

  // ---- Sorting ----
  // Sort from highest to lowest by the chosen stat, e.g. player["gls"].
  // (?? 0 treats empty stats as 0 so they go to the bottom)
  filteredPlayers.sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0))

  // ---- Team list for the dropdown ----
  // Get every player's team, remove duplicates with Set, then sort A-Z.
  const teams = [...new Set(players.map((player) => player.team))].sort()

  // Put every filter back to how it started
  function resetFilters() {
    setSearch('')
    setTeam('')
    setPosition('')
    setSortBy('ga')
    setRegularsOnly(false)
  }

  // Everything inside return() is what shows up on the page (this is JSX).
  return (
    <div className="app">
      <h1>Premier Zone ⚽</h1>
      <p className="subtitle">Find your next Fantasy Premier League pick</p>

      <Filters
        search={search} setSearch={setSearch}
        team={team} setTeam={setTeam}
        position={position} setPosition={setPosition}
        sortBy={sortBy} setSortBy={setSortBy}
        regularsOnly={regularsOnly} setRegularsOnly={setRegularsOnly}
        teams={teams}
        resetFilters={resetFilters}
      />

      {/* Show ONE of these, depending on what's happening */}
      {loading && <p>Loading players...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <PlayerTable players={filteredPlayers} />}
    </div>
  )
}

export default App
