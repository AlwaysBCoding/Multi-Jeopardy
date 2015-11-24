Rails.application.routes.draw do
  get '/' => "pages#homepage", as: :homepage

  get '/games/:slug/player' => "games#player", as: :game_player
  get '/games/:slug/admin' => "games#admin", as: :game_admin
  get '/games/:slug/board' => "games#board", as: :game_board

end

# Start Game,
# Generate unique slug for game
# Invite players link
# Connect clients (ios device ID?)
# Could you actually have an app for this?
