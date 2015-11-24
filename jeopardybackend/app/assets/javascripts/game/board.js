$(function() {
  if($("body").hasClass("games-board")) {

    var gameStateRef = new Firebase("https://leighjeopardy.firebaseio.com/games/" + window.location.pathname.split("/")[2])

    // Player
    var Player = React.createClass({
      // display
      // score

      render: function() {
        return React.createElement("div", {className: "player"},
          React.createElement("p", {className: "display"}, this.props.display),
          React.createElement("div", {className: "flex-divider"}),
          React.createElement("p", {className: "score"}, this.props.score)
        )
      }
    })

    // Category
    var Category = React.createClass({
      // text
      // status

      render: function() {
        switch(this.props.status) {
          case "inprogress":
            return React.createElement("th", {className: "category"}, this.props.text)
          case "completed":
            return React.createElement("th", {className: "category"}, "")
        }
      }
    })

    // Clue
    var Clue = React.createClass({
      // status
      // pointValue
      // questionText

      render: function() {
        switch(this.props.status) {
          case "ready":
            return React.createElement("td", {className: "clue-value"}, `$${this.props.pointValue}`)
          case "current":
            return React.createElement("td", {}, this.props.questionText)
          case "answered":
            return React.createElement("td", {}, "")
        }
      }
    })

    // Board
    var Board = React.createClass({
      // categories
      // clues

      render: function() {
        return React.createElement("table", {},
          React.createElement("thead", {},
            React.createElement("tr", {},
              React.createElement(Category, {status: "inprogress", text: "Some Cat"}),
              React.createElement(Category, {status: "inprogress", text: "Some Cat"}),
              React.createElement(Category, {status: "inprogress", text: "Some Cat"}),
              React.createElement(Category, {status: "inprogress", text: "Some Cat"}),
              React.createElement(Category, {status: "inprogress", text: "Some Cat"}),
              React.createElement(Category, {status: "inprogress", text: "Some Cat"})
            )
          ),
          React.createElement("tbody", {},
            React.createElement("tr", {},
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200})
            ),
            React.createElement("tr", {},
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200})
            ),
            React.createElement("tr", {},
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200})
            ),
            React.createElement("tr", {},
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200})
            ),
            React.createElement("tr", {},
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200}),
              React.createElement(Clue, {status: "ready", pointValue: 200})
            )
          )
        )
      }
    })

    // Game
    var Game = React.createClass({
      // phase
      // board

      getInitialState: function() {
        return {
          phase: "loading-data",
          board: {
            categories: {},
            clues: {}
          }
        }
      },

      componentWillMount: function() {
        renderContext = this
        gameStateRef.on("value", function(snapshot) {
          renderContext.setState(snapshot.val())
        })
      },

      render: function() {
        var ConnectedPlayers
        var MainContent

        ConnectedPlayers = React.createElement("div", {className: "connected-players"},
          React.createElement(Player, {display: "Team Couch", score: 11800}),
          React.createElement(Player, {display: "Team Floor", score: 9500})
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
        case "choose-question":
          MainContent =
          React.createElement(Board, {categories: this.state.board.categories, clues: this.state.board.clues})
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
