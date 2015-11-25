class Game < ActiveRecord::Base

  validates :slug, uniqueness: true

  before_create :generate_slug, :seed_clue_groups
  after_create :sync_to_firebase

  def generate_slug
    self.slug = SecureRandom.base64(6).gsub(/[^0-9A-Za-z]/, "X")
  end

  def seed_clue_groups
    self.single_jeopardy_clue_groups = ClueGroup.where(round: "single").order("RANDOM()").first(6).map(&:id).join(",")
    self.double_jeopardy_clue_groups = ClueGroup.where(round: "double").order("RANDOM()").first(6).map(&:id).join(",")
  end

  def generate_initial_gamestate
    clue_groups_single = self.single_jeopardy_clue_groups.split(",").map { |id| ClueGroup.find(id) }
    clue_groups_double = self.single_jeopardy_clue_groups.split(",").map { |id| ClueGroup.find(id) }

    {
      connectedPlayers: [],
      round: "single",
      phase: "waiting-for-players",
      activeClue: {},
      singleJeopardy: {
        categories: {
          a: {text: "#{clue_groups_single[0].category.name} #{clue_groups_single[0].jeopardy_game.gamedate.strftime('%Y')}", status: "unrevealed"},
          b: {text: "#{clue_groups_single[1].category.name} #{clue_groups_single[1].jeopardy_game.gamedate.strftime('%Y')}", status: "unrevealed"},
          c: {text: "#{clue_groups_single[2].category.name} #{clue_groups_single[2].jeopardy_game.gamedate.strftime('%Y')}", status: "unrevealed"},
          d: {text: "#{clue_groups_single[3].category.name} #{clue_groups_single[3].jeopardy_game.gamedate.strftime('%Y')}", status: "unrevealed"},
          e: {text: "#{clue_groups_single[4].category.name} #{clue_groups_single[4].jeopardy_game.gamedate.strftime('%Y')}", status: "unrevealed"},
          f: {text: "#{clue_groups_single[5].category.name} #{clue_groups_single[5].jeopardy_game.gamedate.strftime('%Y')}", status: "unrevealed"}
        },
        clues: {
          a: {
            a: {},
            b: {},
            c: {},
            d: {},
            e: {}
          },
          b: {
            a: {},
            b: {},
            c: {},
            d: {},
            e: {}
          },
          c: {
            a: {},
            b: {},
            c: {},
            d: {},
            e: {}
          },
          d: {
            a: {},
            b: {},
            c: {},
            d: {},
            e: {}
          },
          e: {
            a: {},
            b: {},
            c: {},
            d: {},
            e: {}
          },
          f: {
            a: {},
            b: {},
            c: {},
            d: {},
            e: {}
          }
        }
      }
      board: {
      },

    }
  end

  def sync_to_firebase
    firebase = Firebase::Client.new("https://leighjeopardy.firebaseio.com")
    firebase.set("/games/#{self.slug}", self.generate_initial_gamestate)
  end

end
