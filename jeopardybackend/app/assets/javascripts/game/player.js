$(function() {
  if($("body").hasClass("games-player")) {

    var GAMESTATEREF = new Firebase("https://leighjeopardy.firebaseio.com/games/" + window.location.pathname.split("/")[2])

    var App = React.createClass({

      componentWillMount: function() {
        renderContext = this
        GAMESTATEREF.on("value", (snapshot) => { renderContext.setState(snapshot.val()) })

        this.username = prompt("What's your username?")
        this.userRef = GAMESTATEREF.child("/connectedPlayers").push({username: this.username, score: 0})
        this.userRef.onDisconnect().remove()
      },

      render: function() {
        GAMESTATEREF.child(`/connectedPlayers/${this.userRef.key()}/score`).set(750)
        return React.createElement("h1", {}, this.username)
      }

    })

    React.render(React.createElement(App), document.querySelector("#js-target"))

  }
})
