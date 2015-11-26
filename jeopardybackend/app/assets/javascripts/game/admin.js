$(function() {
  if($("body").hasClass("games-admin")) {

    // Globals
    var GAMESTATEREF = new Firebase("https://leighjeopardy.firebaseio.com/games/" + window.location.pathname.split("/")[2])

    // Helpers
    var indexToAlpha = function(index) {
      switch(index) {
        case 0:
          return "a"
        case 1:
          return "b"
        case 2:
          return "c"
        case 3:
          return "d"
        case 4:
          return "e"
        case 5:
          return "f"
      }
    }

    // Player
    var Player = React.createClass({
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
      render: function() {
        switch(this.props.category.status) {
          case "revealed":
            return React.createElement("div", {className: "category"},
              React.createElement("p", {className: "category-text"}, this.props.category.text),
              React.createElement("p", {className: "category-comment"}, this.props.category.comments)
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
      render: function() {
        var renderContext = this

        var clueClasses = ""
        clueClasses += "clue "
        if(this.props.phase == "choose-question") { clueClasses += "available" }
        if(this.props.phase == "buzzers-active") {
          this.props.buzzes ? clueClasses += "buzz " : clueClasses += "active" ;
        }

        switch(this.props.clue.status) {
          case "unopened":
            return React.createElement("div", {
              className: clueClasses,
              onClick: (event) => {
                if(renderContext.props.phase == "choose-question") {
                  GAMESTATEREF.child(`${renderContext.props.round}Jeopardy/clues/${renderContext.props.clueKey}/status`).set("current")
                  GAMESTATEREF.child("/activeClue").set(Object.assign(this.props.clue, {"status": "current", "clueKey": renderContext.props.clueKey}))
                  GAMESTATEREF.child("/phase").set("read-question")
                }
              }
            },
              React.createElement("p", {className: "point-value"}, `$${this.props.clue.pointValue}`)
            )
          case "current":
            return React.createElement("div", {className: clueClasses},
              React.createElement("p", {className: "question-text"}, this.props.clue.questionText),
              React.createElement("hr", {}),
              React.createElement("p", {className: "question-text"}, this.props.clue.answerText)
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
      render: function() {
        return React.createElement("div", {className: "game-board"},
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.a})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.a, clueKey: "a/a", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.b, clueKey: "a/b", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.c, clueKey: "a/c", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.d, clueKey: "a/d", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.a.e, clueKey: "a/e", phase: this.props.phase, round: this.props.round})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.b})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.a, clueKey: "b/a", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.b, clueKey: "b/b", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.c, clueKey: "b/c", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.d, clueKey: "b/d", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.b.e, clueKey: "b/e", phase: this.props.phase, round: this.props.round})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.c})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.a, clueKey: "c/a", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.b, clueKey: "c/b", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.c, clueKey: "c/c", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.d, clueKey: "c/d", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.c.e, clueKey: "c/e", phase: this.props.phase, round: this.props.round})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.d})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.a, clueKey: "d/a", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.b, clueKey: "d/b", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.c, clueKey: "d/c", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.d, clueKey: "d/d", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.d.e, clueKey: "d/e", phase: this.props.phase, round: this.props.round})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.e})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.a, clueKey: "e/a", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.b, clueKey: "e/b", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.c, clueKey: "e/c", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.d, clueKey: "e/d", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.e.e, clueKey: "e/e", phase: this.props.phase, round: this.props.round})
            )
          ),
          React.createElement("div", {className: "column"},
            React.createElement("div", {className: "row"},
              React.createElement(Category, {category: this.props.board.categories.f})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.a, clueKey: "f/a", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.b, clueKey: "f/b", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.c, clueKey: "f/c", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.d, clueKey: "f/d", phase: this.props.phase, round: this.props.round})
            ),
            React.createElement("div", {className: "row"},
              React.createElement(Clue, {clue: this.props.board.clues.f.e, clueKey: "f/e", phase: this.props.phase, round: this.props.round})
            )
          )
        )
      }
    })

    // ActionButtons
    var ActionButtons = React.createClass({
      render: function() {
        var renderContext = this
        var ActionButtonsContent

        switch(this.props.gameState.phase) {

          case "waiting-for-players":
            ActionButtonsContent = [
              React.createElement("div", {
                className: "action-button",
                onClick: (event) => { GAMESTATEREF.child("/phase").set("reveal-categories") }},
                React.createElement("p", {className: "action-button-text"}, "Start Game")
              )
            ]
            break

          case "reveal-categories":
            switch(this.props.gameState.round) {
              case "single":
                var categories = [this.props.gameState.singleJeopardy.categories.a,
                                  this.props.gameState.singleJeopardy.categories.b,
                                  this.props.gameState.singleJeopardy.categories.c,
                                  this.props.gameState.singleJeopardy.categories.d,
                                  this.props.gameState.singleJeopardy.categories.e,
                                  this.props.gameState.singleJeopardy.categories.f]
                if(_.all(categories, (category) => { return category.status === "revealed" })) {
                  ActionButtonsContent =
                    React.createElement("div", {
                      className: "action-button",
                      onClick: (event) => {
                        var nextPlayerControl = _.sample(renderContext.props.gameState.connectedPlayers)
                        GAMESTATEREF.child("/phase").set("choose-question")
                        GAMESTATEREF.child("/controlPlayer").set(nextPlayerControl.key)
                      }},
                      React.createElement("p", {className: "action-button-text"}, "Start Game")
                    )
                } else {
                  ActionButtonsContent =
                    React.createElement("div", {
                      className: "action-button",
                      onClick: (event) => {
                        var nextCategory = _.find(categories, (category) => { return category.status === "unrevealed" })
                        var nextCategoryIndex = _.indexOf(categories, nextCategory)
                        var categoryKey = indexToAlpha(nextCategoryIndex)
                        GAMESTATEREF.child(`/singleJeopardy/categories/${categoryKey}/status`).set("revealed")
                       }},
                      React.createElement("p", {className: "action-button-text"}, "Reveal Category")
                    )
                }
                break

              case "double":
                var categories = [this.props.gameState.doubleJeopardy.categories.a,
                                  this.props.gameState.doubleJeopardy.categories.b,
                                  this.props.gameState.doubleJeopardy.categories.c,
                                  this.props.gameState.doubleJeopardy.categories.d,
                                  this.props.gameState.doubleJeopardy.categories.e,
                                  this.props.gameState.doubleJeopardy.categories.f]
                if(_.all(categories, (category) => { return category.status === "revealed" })) {
                  ActionButtonsContent =
                    React.createElement("div", {
                      className: "action-button",
                      onClick: (event) => {
                        GAMESTATEREF.child("/phase").set("choose-question")
                      }},
                      React.createElement("p", {className: "action-button-text"}, "Start Game")
                    )
                } else {
                  ActionButtonsContent =
                    React.createElement("div", {
                      className: "action-button",
                      onClick: (event) => {
                        var nextCategory = _.find(categories, (category) => { return category.status === "unrevealed" })
                        var nextCategoryIndex = _.indexOf(categories, nextCategory)
                        var categoryKey = indexToAlpha(nextCategoryIndex)
                        GAMESTATEREF.child(`/doubleJeopardy/categories/${categoryKey}/status`).set("revealed")
                       }},
                      React.createElement("p", {className: "action-button-text"}, "Reveal Category")
                    )
                }
                break
            }
            break

          case "read-question":
            ActionButtonsContent = [
              React.createElement("div", {
                className: "action-button",
                onClick: (event) => {
                  GAMESTATEREF.child("/phase").set("buzzers-active")
                }},
                React.createElement("p", {className: "action-button-text"}, "Activate Buzzers")
              )
            ]
            break
          case "buzzers-active":
            if(this.props.gameState.buzzes) {
              ActionButtonsContent = [
                React.createElement("div", {
                  className: "action-button",
                  onClick: (event) => {

                  }},
                  React.createElement("p", {className: "action-button-text"}, "Correct"))
                ,
                React.createElement("div", {
                  className: "action-button",
                  onClick: (event) => {

                  }},
                  React.createElement("p", {className: "action-button-text"}, "Wrong"))
                ,
                React.createElement("div", {
                  className: "action-button",
                  onClick: (event) => {
                    GAMESTATEREF.child("/buzzes").remove()
                  }},
                  React.createElement("p", {className: "action-button-text"}, "Reset"))
              ]
              break
            } else {
              ActionButtonsContent = [
                React.createElement("div", {
                  className: "action-button",
                  onClick: (event) => {
                    GAMESTATEREF.child("/phase").set("choose-question")
                    GAMESTATEREF.child(`/${renderContext.props.gameState.round}Jeopardy/clues/${renderContext.props.gameState.activeClue.clueKey}/status`).set("completed")
                  }},
                  React.createElement("p", {className: "action-button-text"}, "Back To Board")
                )
              ]
              break
            }
          default:
            return React.createElement("div", {className: "action-buttons"})
        }

        return React.createElement("div", {className: "action-buttons"},
          ActionButtonsContent
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
        GAMESTATEREF.on("value", (snap) => {
          renderContext.replaceState(snap.val())
        })
      },

      render: function() {
        var renderContext = this
        var ConnectedPlayers
        var MainContent

        var moddedPlayers = _.map(this.state.connectedPlayers, (player, key) => { return Object.assign(player, {key: key}) })

        ConnectedPlayers =
         React.createElement("div", {className: "connected-players"},
          _.map(_.sortBy(moddedPlayers, (player) => { return player.score }).reverse(), (player) => {
            return React.createElement(Player, {player: player, key: player.key, controlPlayer: renderContext.state.controlPlayer, buzzPlayer: _.first(_.map(renderContext.state.buzzes, (value) => { return value.playerKey }))})
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
              MainContent = React.createElement(Board, {board: this.state.singleJeopardy, phase: this.state.phase, round: this.state.round})
              break
            case "double":
              MainContent = React.createElement(Board, {board: this.state.doubleJeopardy, phase: this.state.phase, round: this.state.round})
              break
          }
          break
        case "read-question":
        case "buzzers-active":
          MainContent =
          React.createElement(Clue, {clue: this.state.activeClue, phase: this.state.phase, round: this.state.round, buzzes: this.state.buzzes})
          break
        }

        return React.createElement("div", {className: "container"},
          ConnectedPlayers,
          MainContent,
          React.createElement(ActionButtons, {gameState: this.state})
        )

      }
    })

    React.render(React.createElement(Game), document.querySelector("#js-target"))

  }
})
