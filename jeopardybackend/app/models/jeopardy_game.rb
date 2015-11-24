class JeopardyGame < ActiveRecord::Base
  has_many :clue_groups, dependent: :destroy

  validates :jarchive_id, presence: true, uniqueness: true

  def self.synced_jarchive_ids
    self.all.map(&:jarchive_id)
  end

  def self.jarchive_ids_to_sync
    Array(1..10000) - self.synced_jarchive_ids
  end

end
