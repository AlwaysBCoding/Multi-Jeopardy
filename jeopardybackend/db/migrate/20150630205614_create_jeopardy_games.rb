class CreateJeopardyGames < ActiveRecord::Migration
  def change
    create_table :jeopardy_games do |t|
      t.date :gamedate
      t.timestamps null: false
    end
  end
end
