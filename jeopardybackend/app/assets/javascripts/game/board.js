$(function() {
  if($("body").hasClass("games-board")) {

    var GAMESTATEREF = new Firebase("https://leighjeopardy.firebaseio.com/games/" + window.location.pathname.split("/")[2])

    // Player
    var Player = React.createClass({
      // username
      // score

      componentWillMount: function() {
      },

      render: function() {
        var playerClasses = ""
        playerClasses += "player "
        if(this.props.controlPlayer == this.props.player.key) { playerClasses += "control " }
        if(this.props.buzzPlayer == this.props.player.key) { playerClasses += "buzz "}

        return React.createElement("div", {className: playerClasses},
          React.createElement("p", {className: "display"}, this.props.player.username),
          React.createElement("div", {className: "flex-divider"}),
          React.createElement("p", {className: "score"}, this.props.player.score)
        )
      }
    })

    // Category
    var Category = React.createClass({
      // text
      // status

      render: function() {
        switch(this.props.category.status) {
          case "revealed":
            return React.createElement("div", {className: "category"},
              React.createElement("p", {className: "category-text"}, this.props.category.text)
            )
          case "unrevealed":
          case "completed":
            return React.createElement("div", {className: "category"},
              React.createElement("p", {className: "category-text"}, "")
            )
        }
      }
    })

    // Clue
    var Clue = React.createClass({
      // status
      // pointValue
      // questionText

      render: function() {
        switch(this.props.clue.status) {
          case "unopened":
            return React.createElement("div", {className: "clue"},
              React.createElement("p", {className: "point-value"}, `$${this.props.clue.pointValue}`)
            )
          case "current":
            return React.createElement("div", {className: "clue"},
              React.createElement("p", {className: "question-text"}, this.props.clue.questionText)
            )
          case "completed":
            return React.createElement("div", {className: "clue"},
              React.createElement("p", {className: "point-value"}, "")
            )
        }
      }
    })

    // Board
    var Board = React.createClass({
      // categories
      // clues

      render: function() {
        return React.createElement("div", {className: "game-board"},
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.a})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.a})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.b})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.c})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.d})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.e})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.b})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.a})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.b})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.c})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.d})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.e})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.c})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.a})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.b})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.c})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.d})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.e})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.d})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.a})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.b})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.c})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.d})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.e})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.e})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.a})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.b})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.c})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.d})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.e})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.f})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.a})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.b})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.c})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.d})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.e})
            )
          )
        )
      }
    })

    // Game
    var Game = React.createClass({
      getInitialState: function() {
        return {
          phase: "loading-data",
        }
      },

      componentWillMount: function() {
        renderContext = this
        GAMESTATEREF.on("value", (snapshot) => { renderContext.setState(snapshot.val()) })
      },

      render: function() {
        var renderContext = this
        var ConnectedPlayers
        var MainContent

        var moddedPlayers = _.map(this.state.connectedPlayers, (player, key) => { return Object.assign(player, {key: key}) })

        ConnectedPlayers =
         React.createElement("div", {className: "connected-players"},
          _.map(_.sortBy(moddedPlayers, (player) => { return player.score }).reverse(), (player) => {
            return React.createElement(Player, {player: player, key: player.key, controlPlayer: renderContext.state.controlPlayer, buzzPlayer: renderContext.state.buzzPlayer})
          })
        )

        switch(this.state.phase) {
        case "loading-data":
          MainContent =
          React.createElement("div", {className: "loading-container"},
            React.createElement("h1", {className: "loading-text"}, "Loading Data...")
          )
          break
        case "waiting-for-players":
          MainContent =
          React.createElement("div", {className: "waiting-for-players-container"},
            React.createElement("h1", {className: "waiting-for-players-text"}, "Waiting for Players")
          )
          break
        case "reveal-categories":
        case "choose-question":
          switch(this.state.round) {
            case "single":
              MainContent = React.createElement(Board, {board: this.state.singleJeopardy})
              break
            case "double":
              MainContent = React.createElement(Board, {board: this.state.doubleJeopardy})
              break
          }
          break
        case "read-question":
          MainContent =
          React.createElement(Clue, {clue: this.state.activeClue})
          break
        }

        return React.createElement("div", {className: "container"},
          ConnectedPlayers,
          MainContent
        )

      }
    })

    React.render(React.createElement(Game), document.querySelector("#js-target"))

  }
})
