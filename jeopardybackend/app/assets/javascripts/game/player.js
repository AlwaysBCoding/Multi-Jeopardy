$(function() {
  if($("body").hasClass("games-player")) {

    var GAMESTATEREF = new Firebase("https://leighjeopardy.firebaseio.com/games/" + window.location.pathname.split("/")[2])

    var Buzzer = React.createClass({

      componentWillMount: function() {
        this.throttledBuzzIn = _.throttle(this.buzzIn, 500)
      },

      buzzIn: function() {
        GAMESTATEREF.child("/buzzes").push({playerKey: this.props.playerKey})
      },

      handleBuzz: function(event) {
        if(this.props.gameState.phase == "buzzers-active") {
          this.throttledBuzzIn()
        }
      },

      render: function() {
        var classNames = ""
        classNames += "buzzer "
        switch(this.props.gameState.phase) {
          case "buzzers-active":
            classNames += "active "
            break
          default:
            classNames += "inactive "
        }

        return React.createElement("div", {className: classNames, onClick: this.handleBuzz},
          React.createElement("p", {className: "buzzer-text"}, "BUZZER")
        )

      }

    })

    var App = React.createClass({

      componentWillMount: function() {
        var renderContext = this
        GAMESTATEREF.on("value", function(snapshot) { renderContext.replaceState(snapshot.val()) })
      },

      render: function() {
        var renderContext = this
        var MainContent
        var SecondaryContent

        if(this.username) {
          MainContent =
          React.createElement("div", {className: "username"},
            React.createElement("p", {className: "username-text"}, this.username)
          )
          SecondaryContent =
          React.createElement(Buzzer, {gameState: this.state, playerKey: this.userRef.key()})
        } else {
          MainContent =
          React.createElement("div", {
            className: "join-game-button",
            onClick: function(event) {
              var username = prompt("What is your username")
              if(username) {
                renderContext.username = username
                renderContext.userRef = GAMESTATEREF.child("/connectedPlayers").push({username: username, score: 0})
                renderContext.userRef.onDisconnect().remove()
              }
            }
          },
            React.createElement("p", {}, "Join Game")
          )
          SecondaryContent =
          React.createElement("div", {}, "")
        }

        return React.createElement("div", {className: "container"},
          MainContent,
          SecondaryContent
        )
      }

    })

    React.render(React.createElement(App), document.querySelector("#js-target"))

  }
})
