class AddJarchiveIdToJeopardyGame < ActiveRecord::Migration
  def change
    add_column :jeopardy_games, :jarchive_id, :integer
    add_column :jeopardy_games, :game_exists, :boolean
  end
end
