class JeopardyGame < ActiveRecord::Base
  has_many :clue_groups
end
