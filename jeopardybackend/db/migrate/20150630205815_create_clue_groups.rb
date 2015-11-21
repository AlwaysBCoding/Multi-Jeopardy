class CreateClueGroups < ActiveRecord::Migration
  def change
    create_table :clue_groups do |t|
      t.belongs_to :category
      t.belongs_to :jeopardy_game
      t.string :round

      t.timestamps null: false
    end
  end
end
