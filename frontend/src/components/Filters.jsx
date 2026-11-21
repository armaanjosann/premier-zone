// Filters shows all the search boxes and dropdowns.
// It doesn't store anything itself - App.jsx gives it each value
// AND the function to change it (e.g. team + setTeam).

function Filters({
  search, setSearch,
  team, setTeam,
  position, setPosition,
  sortBy, setSortBy,
  regularsOnly, setRegularsOnly,
  teams,
  resetFilters,
}) {
  return (
    <div className="filters">
      {/* Name search: every letter typed updates "search" in App.jsx */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* Team dropdown: one <option> for each team */}
      <select value={team} onChange={(event) => setTeam(event.target.value)}>
        <option value="">All teams</option>
        {teams.map((teamName) => (
          <option key={teamName} value={teamName}>
            {teamName.replaceAll('-', ' ')}
          </option>
        ))}
      </select>

      {/* Position dropdown: the value is what's stored in the database */}
      <select value={position} onChange={(event) => setPosition(event.target.value)}>
        <option value="">All positions</option>
        <option value="GK">Goalkeepers</option>
        <option value="DF">Defenders</option>
        <option value="MF">Midfielders</option>
        <option value="FW">Forwards</option>
      </select>

      {/* Sort dropdown: the value is the stat name from the API (e.g. "gls") */}
      <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
        <option value="ga">Sort by: Goals + Assists</option>
        <option value="gls">Sort by: Goals</option>
        <option value="ast">Sort by: Assists</option>
        <option value="xg">Sort by: Expected Goals (xG)</option>
        <option value="xag">Sort by: Expected Assists (xAG)</option>
        <option value="min">Sort by: Minutes Played</option>
      </select>

      {/* Checkbox: for checkboxes we use "checked" instead of "value" */}
      <label>
        <input
          type="checkbox"
          checked={regularsOnly}
          onChange={(event) => setRegularsOnly(event.target.checked)}
        />
        Regular starters only (5+ starts)
      </label>

      <button onClick={resetFilters}>Reset</button>
    </div>
  )
}

export default Filters
