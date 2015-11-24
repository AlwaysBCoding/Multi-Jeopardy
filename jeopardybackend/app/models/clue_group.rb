class ClueGroup < ActiveRecord::Base
  belongs_to :category
  belongs_to :jeopardy_game
  has_many :clues, dependent: :destroy
end
