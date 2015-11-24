$(function() {
  if($("body").hasClass("games-board")) {

    // var gameStateRef = new Firebase("https://leighjeopardy.firebaseio.com/games/" + window.location.pathname.split("/")[2])
    var mockGameState = {
      connectedPlayers: [
        {display: "Jordan", score: 1800, status: "buzz"},
        {display: "Casey", score: 1500, status: "idle"},
        {display: "Chris", score: 1600, status: "idle"}
      ],
      phase: "read-question",
      activeClue: {
        status: "current",
        pointValue: 400,
        questionText: "The Jungle Zone is open at Paul Brown stadium before this team's home games",
        answerText: "the Bengals"
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
              status: "completed",
              pointValue: 200,
              questionText: "The mascot of this NFC team is named Roary",
              answerText: "(Detroit) Lions"
            },
            b: {
              status: "completed",
              pointValue: 400,
              questionText: "The Jungle Zone is open at Paul Brown stadium before this team's home games",
              answerText: "the Bengals"
            },
            c: {
              status: "unopened",
              pointValue: 600
            },
            d: {
              status: "unopened",
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
              status: "unopened",
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
              status: "unopened",
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
              status: "unopened",
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
              status: "unopened",
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
              status: "unopened",
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
      // status
      // display
      // score

      componentWillMount: function() {
        this.playerClasses = ""

        switch(this.props.status) {
          case "idle":
            this.playerClasses += "player"
            break
          case "buzz":
            this.playerClasses += "player buzz"
            break
        }
      },

      render: function() {
        return React.createElement("div", {className: this.playerClasses},
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
              React.createElement("p", {className: "category-text"}, this.props.text)
            )
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
        switch(this.props.status) {
          case "unopened":
            return React.createElement("div", {className: "clue"},
              React.createElement("p", {className: "point-value"}, `$${this.props.pointValue}`)
            )
          case "current":
            return React.createElement("div", {className: "clue"},
              React.createElement("p", {className: "question-text"}, this.props.questionText)
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
              React.createElement(Category, {text: mockGameState.board.categories.a.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.a.pointValue, status: mockGameState.board.clues.a.a.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.b.pointValue, status: mockGameState.board.clues.a.b.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.c.pointValue, status: mockGameState.board.clues.a.c.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.d.pointValue, status: mockGameState.board.clues.a.d.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.a.e.pointValue, status: mockGameState.board.clues.a.e.status})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.b.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.a.pointValue, status: mockGameState.board.clues.b.a.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.b.pointValue, status: mockGameState.board.clues.b.b.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.c.pointValue, status: mockGameState.board.clues.b.c.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.d.pointValue, status: mockGameState.board.clues.b.d.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.b.e.pointValue, status: mockGameState.board.clues.b.e.status})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.c.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.a.pointValue, status: mockGameState.board.clues.c.a.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.b.pointValue, status: mockGameState.board.clues.c.b.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.c.pointValue, status: mockGameState.board.clues.c.c.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.d.pointValue, status: mockGameState.board.clues.c.d.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.c.e.pointValue, status: mockGameState.board.clues.c.e.status})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.d.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.a.pointValue, status: mockGameState.board.clues.d.a.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.b.pointValue, status: mockGameState.board.clues.d.b.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.c.pointValue, status: mockGameState.board.clues.d.c.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.d.pointValue, status: mockGameState.board.clues.d.d.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.d.e.pointValue, status: mockGameState.board.clues.d.e.status})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.e.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.a.pointValue, status: mockGameState.board.clues.e.a.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.b.pointValue, status: mockGameState.board.clues.e.b.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.c.pointValue, status: mockGameState.board.clues.e.c.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.d.pointValue, status: mockGameState.board.clues.e.d.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.e.e.pointValue, status: mockGameState.board.clues.e.e.status})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {text: mockGameState.board.categories.f.text, status: "inprogress"})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.a.pointValue, status: mockGameState.board.clues.f.a.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.b.pointValue, status: mockGameState.board.clues.f.b.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.c.pointValue, status: mockGameState.board.clues.f.c.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.d.pointValue, status: mockGameState.board.clues.f.d.status})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {pointValue: mockGameState.board.clues.f.e.pointValue, status: mockGameState.board.clues.f.e.status})
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

        ConnectedPlayers =
         React.createElement("div", {className: "connected-players"},
          _.map(_.sortBy(this.state.connectedPlayers, (player) => { return player.score }).reverse(), (player) => {
            return React.createElement(Player, {status: player.status, display: player.display, score: player.score})
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
        case "choose-question":
          MainContent =
          React.createElement(Board, {categories: this.state.board.categories, clues: this.state.board.clues})
          break
        case "read-question":
          MainContent =
          React.createElement(Clue, {
            status: mockGameState.activeClue.status,
            pointValue: mockGameState.activeClue.pointValue,
            questionText: mockGameState.activeClue.questionText,
            answerText: mockGameState.activeClue.answerText
          })
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
