$(function() {
  if($("body").hasClass("games-board")) {

    // var gameStateRef = new Firebase("https://leighjeopardy.firebaseio.com/games/" + window.location.pathname.split("/")[2])
    var mockGameState = {
      phase: "choose-question",
      activeClue: {
        status: "current",
        pointValue: 200,
        questionText: "",
        answerText: ""
      },
      board: {
        categories: {
          a: {text: "THE NFL (2013)"},
          b: {text: "STUPID ANSWERS (2006)"},
          c: {text: "FANTASTIC FILMS (1990)"},
          d: {text: "SNOWY SONGS (2004)"},
          e: {text: "FOODS OF THE WORLD (1993)"},
          f: {text: "BUSINESS & THE MARKET (2014)"}
        },
        clues: {
          a: {
            a: {
              status: "unopened",
              pointValue: 200
            },
            b: {
              status: "unopened",
              pointValue: 400
            },
            c: {
              status: "unopened",
              pointValue: 600
            },
            d: {
              status: "unopenend",
              pointValue: 800
            },
            e: {
              status: "unopened",
              pointValue: 1000
            }
          },
          b: {
            a: {
              status: "unopened",
              pointValue: 200
            },
            b: {
              status: "unopened",
              pointValue: 400
            },
            c: {
              status: "unopened",
              pointValue: 600
            },
            d: {
              status: "unopenend",
              pointValue: 800
            },
            e: {
              status: "unopened",
              pointValue: 1000
            }
          },
          c: {
            a: {
              status: "unopened",
              pointValue: 200
            },
            b: {
              status: "unopened",
              pointValue: 400
            },
            c: {
              status: "unopened",
              pointValue: 600
            },
            d: {
              status: "unopenend",
              pointValue: 800
            },
            e: {
              status: "unopened",
              pointValue: 1000
            }
          },
          d: {
            a: {
              status: "unopened",
              pointValue: 200
            },
            b: {
              status: "unopened",
              pointValue: 400
            },
            c: {
              status: "unopened",
              pointValue: 600
            },
            d: {
              status: "unopenend",
              pointValue: 800
            },
            e: {
              status: "unopened",
              pointValue: 1000
            }
          },
          e: {
            a: {
              status: "unopened",
              pointValue: 200
            },
            b: {
              status: "unopened",
              pointValue: 400
            },
            c: {
              status: "unopened",
              pointValue: 600
            },
            d: {
              status: "unopenend",
              pointValue: 800
            },
            e: {
              status: "unopened",
              pointValue: 1000
            }
          },
          f: {
            a: {
              status: "unopened",
              pointValue: 200
            },
            b: {
              status: "unopened",
              pointValue: 400
            },
            c: {
              status: "unopened",
              pointValue: 600
            },
            d: {
              status: "unopenend",
              pointValue: 800
            },
            e: {
              status: "unopened",
              pointValue: 1000
            }
          }
        }
      }
    }

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
            return React.createElement("div", {className: "category"},
              React.createElement("p", {}, this.props.text)
            )
          case "completed":
            return React.createElement("div", {className: "category"},
              React.createElement("p", {}, this.props.text)
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
        switch(this.props.status) {
          case "unopened":
            return React.createElement("div", {className: "clue"},
              React.createElement("p", {}, `$${this.props.pointValue}`)
            )
          case "current":
            return React.createElement("td", {}, this.props.questionText)
          case "completed":
            return React.createElement("td", {}, "")
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
              React.createElement(Category, {text: mockGameState.board.categories.a.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.a.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.b.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.c.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.d.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.e.pointValue, status: "unopened"})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.b.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.a.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.b.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.c.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.d.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.e.pointValue, status: "unopened"})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.c.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.a.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.b.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.c.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.d.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.e.pointValue, status: "unopened"})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.d.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.a.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.b.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.c.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.d.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.e.pointValue, status: "unopened"})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.e.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.a.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.b.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.c.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.d.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.e.pointValue, status: "unopened"})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.f.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.a.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.b.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.c.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.d.pointValue, status: "unopened"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.e.pointValue, status: "unopened"})
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
        // gameStateRef.on("value", function(snapshot) {
        //   renderContext.setState(snapshot.val())
        // })

        renderContext.setState(mockGameState)
      },

      render: function() {
        var ConnectedPlayers
        var MainContent

        ConnectedPlayers = React.createElement("div", {className: "connected-players"},
          React.createElement(Player, {display: "Player 1", score: 0}),
          React.createElement(Player, {display: "Player 2", score: 0})
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
        case "show-question":
          MainContent =
          React.createElement(Clue, {})
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
