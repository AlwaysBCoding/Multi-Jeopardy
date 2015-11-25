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
    clue_groups_double = self.double_jeopardy_clue_groups.split(",").map { |id| ClueGroup.find(id) }

    {
      connectedPlayers: [],
      controlPlayer: "",
      buzzedPlayer: "",
      round: "single",
      phase: "waiting-for-players",
      activeClue: {},
      singleJeopardy: {
        categories: {
          a: {text: "#{clue_groups_single[0].category.name} (#{clue_groups_single[0].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_single[0].category.comments, status: "unrevealed"},
          b: {text: "#{clue_groups_single[1].category.name} (#{clue_groups_single[1].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_single[1].category.comments, status: "unrevealed"},
          c: {text: "#{clue_groups_single[2].category.name} (#{clue_groups_single[2].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_single[2].category.comments, status: "unrevealed"},
          d: {text: "#{clue_groups_single[3].category.name} (#{clue_groups_single[3].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_single[3].category.comments, status: "unrevealed"},
          e: {text: "#{clue_groups_single[4].category.name} (#{clue_groups_single[4].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_single[4].category.comments, status: "unrevealed"},
          f: {text: "#{clue_groups_single[5].category.name} (#{clue_groups_single[5].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_single[5].category.comments, status: "unrevealed"}
        },
        clues: {
          a: {
            a: {questionText: clue_groups_single[0].clues.where(point_value: 200).first.question, answerText: clue_groups_single[0].clues.where(point_value: 200).first.answer, pointValue: 200, status: "unopened"},
            b: {questionText: clue_groups_single[0].clues.where(point_value: 400).first.question, answerText: clue_groups_single[0].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            c: {questionText: clue_groups_single[0].clues.where(point_value: 600).first.question, answerText: clue_groups_single[0].clues.where(point_value: 600).first.answer, pointValue: 600, status: "unopened"},
            d: {questionText: clue_groups_single[0].clues.where(point_value: 800).first.question, answerText: clue_groups_single[0].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            e: {questionText: clue_groups_single[0].clues.where(point_value: 1000).first.question, answerText: clue_groups_single[0].clues.where(point_value: 1000).first.answer, pointValue: 1000, status: "unopened"}
          },
          b: {
            a: {questionText: clue_groups_single[1].clues.where(point_value: 200).first.question, answerText: clue_groups_single[1].clues.where(point_value: 200).first.answer, pointValue: 200, status: "unopened"},
            b: {questionText: clue_groups_single[1].clues.where(point_value: 400).first.question, answerText: clue_groups_single[1].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            c: {questionText: clue_groups_single[1].clues.where(point_value: 600).first.question, answerText: clue_groups_single[1].clues.where(point_value: 600).first.answer, pointValue: 600, status: "unopened"},
            d: {questionText: clue_groups_single[1].clues.where(point_value: 800).first.question, answerText: clue_groups_single[1].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            e: {questionText: clue_groups_single[1].clues.where(point_value: 1000).first.question, answerText: clue_groups_single[1].clues.where(point_value: 1000).first.answer, pointValue: 1000, status: "unopened"}
          },
          c: {
            a: {questionText: clue_groups_single[2].clues.where(point_value: 200).first.question, answerText: clue_groups_single[2].clues.where(point_value: 200).first.answer, pointValue: 200, status: "unopened"},
            b: {questionText: clue_groups_single[2].clues.where(point_value: 400).first.question, answerText: clue_groups_single[2].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            c: {questionText: clue_groups_single[2].clues.where(point_value: 600).first.question, answerText: clue_groups_single[2].clues.where(point_value: 600).first.answer, pointValue: 600, status: "unopened"},
            d: {questionText: clue_groups_single[2].clues.where(point_value: 800).first.question, answerText: clue_groups_single[2].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            e: {questionText: clue_groups_single[2].clues.where(point_value: 1000).first.question, answerText: clue_groups_single[2].clues.where(point_value: 1000).first.answer, pointValue: 1000, status: "unopened"}
          },
          d: {
            a: {questionText: clue_groups_single[3].clues.where(point_value: 200).first.question, answerText: clue_groups_single[3].clues.where(point_value: 200).first.answer, pointValue: 200, status: "unopened"},
            b: {questionText: clue_groups_single[3].clues.where(point_value: 400).first.question, answerText: clue_groups_single[3].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            c: {questionText: clue_groups_single[3].clues.where(point_value: 600).first.question, answerText: clue_groups_single[3].clues.where(point_value: 600).first.answer, pointValue: 600, status: "unopened"},
            d: {questionText: clue_groups_single[3].clues.where(point_value: 800).first.question, answerText: clue_groups_single[3].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            e: {questionText: clue_groups_single[3].clues.where(point_value: 1000).first.question, answerText: clue_groups_single[3].clues.where(point_value: 1000).first.answer, pointValue: 1000, status: "unopened"}
          },
          e: {
            a: {questionText: clue_groups_single[4].clues.where(point_value: 200).first.question, answerText: clue_groups_single[4].clues.where(point_value: 200).first.answer, pointValue: 200, status: "unopened"},
            b: {questionText: clue_groups_single[4].clues.where(point_value: 400).first.question, answerText: clue_groups_single[4].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            c: {questionText: clue_groups_single[4].clues.where(point_value: 600).first.question, answerText: clue_groups_single[4].clues.where(point_value: 600).first.answer, pointValue: 600, status: "unopened"},
            d: {questionText: clue_groups_single[4].clues.where(point_value: 800).first.question, answerText: clue_groups_single[4].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            e: {questionText: clue_groups_single[4].clues.where(point_value: 1000).first.question, answerText: clue_groups_single[4].clues.where(point_value: 1000).first.answer, pointValue: 1000, status: "unopened"}
          },
          f: {
            a: {questionText: clue_groups_single[5].clues.where(point_value: 200).first.question, answerText: clue_groups_single[5].clues.where(point_value: 200).first.answer, pointValue: 200, status: "unopened"},
            b: {questionText: clue_groups_single[5].clues.where(point_value: 400).first.question, answerText: clue_groups_single[5].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            c: {questionText: clue_groups_single[5].clues.where(point_value: 600).first.question, answerText: clue_groups_single[5].clues.where(point_value: 600).first.answer, pointValue: 600, status: "unopened"},
            d: {questionText: clue_groups_single[5].clues.where(point_value: 800).first.question, answerText: clue_groups_single[5].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            e: {questionText: clue_groups_single[5].clues.where(point_value: 1000).first.question, answerText: clue_groups_single[5].clues.where(point_value: 1000).first.answer, pointValue: 1000, status: "unopened"}
          }
        }
      },
      doubleJeopardy: {
        categories: {
          a: {text: "#{clue_groups_double[0].category.name} (#{clue_groups_double[0].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_double[0].category.comments, status: "unrevealed"},
          b: {text: "#{clue_groups_double[1].category.name} (#{clue_groups_double[1].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_double[1].category.comments, status: "unrevealed"},
          c: {text: "#{clue_groups_double[2].category.name} (#{clue_groups_double[2].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_double[2].category.comments, status: "unrevealed"},
          d: {text: "#{clue_groups_double[3].category.name} (#{clue_groups_double[3].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_double[3].category.comments, status: "unrevealed"},
          e: {text: "#{clue_groups_double[4].category.name} (#{clue_groups_double[4].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_double[4].category.comments, status: "unrevealed"},
          f: {text: "#{clue_groups_double[5].category.name} (#{clue_groups_double[5].jeopardy_game.gamedate.strftime('%Y')})", comments: clue_groups_double[5].category.comments, status: "unrevealed"}
        },
        clues: {
          a: {
            a: {questionText: clue_groups_double[0].clues.where(point_value: 400).first.question, answerText: clue_groups_double[0].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            b: {questionText: clue_groups_double[0].clues.where(point_value: 800).first.question, answerText: clue_groups_double[0].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            c: {questionText: clue_groups_double[0].clues.where(point_value: 1200).first.question, answerText: clue_groups_double[0].clues.where(point_value: 1200).first.answer, pointValue: 1200, status: "unopened"},
            d: {questionText: clue_groups_double[0].clues.where(point_value: 1600).first.question, answerText: clue_groups_double[0].clues.where(point_value: 1600).first.answer, pointValue: 1600, status: "unopened"},
            e: {questionText: clue_groups_double[0].clues.where(point_value: 2000).first.question, answerText: clue_groups_double[0].clues.where(point_value: 2000).first.answer, pointValue: 2000, status: "unopened"}
          },
          b: {
            a: {questionText: clue_groups_double[1].clues.where(point_value: 400).first.question, answerText: clue_groups_double[1].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            b: {questionText: clue_groups_double[1].clues.where(point_value: 800).first.question, answerText: clue_groups_double[1].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            c: {questionText: clue_groups_double[1].clues.where(point_value: 1200).first.question, answerText: clue_groups_double[1].clues.where(point_value: 1200).first.answer, pointValue: 1200, status: "unopened"},
            d: {questionText: clue_groups_double[1].clues.where(point_value: 1600).first.question, answerText: clue_groups_double[1].clues.where(point_value: 1600).first.answer, pointValue: 1600, status: "unopened"},
            e: {questionText: clue_groups_double[1].clues.where(point_value: 2000).first.question, answerText: clue_groups_double[1].clues.where(point_value: 2000).first.answer, pointValue: 2000, status: "unopened"}
          },
          c: {
            a: {questionText: clue_groups_double[2].clues.where(point_value: 400).first.question, answerText: clue_groups_double[2].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            b: {questionText: clue_groups_double[2].clues.where(point_value: 800).first.question, answerText: clue_groups_double[2].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            c: {questionText: clue_groups_double[2].clues.where(point_value: 1200).first.question, answerText: clue_groups_double[2].clues.where(point_value: 1200).first.answer, pointValue: 1200, status: "unopened"},
            d: {questionText: clue_groups_double[2].clues.where(point_value: 1600).first.question, answerText: clue_groups_double[2].clues.where(point_value: 1600).first.answer, pointValue: 1600, status: "unopened"},
            e: {questionText: clue_groups_double[2].clues.where(point_value: 2000).first.question, answerText: clue_groups_double[2].clues.where(point_value: 2000).first.answer, pointValue: 2000, status: "unopened"}
          },
          d: {
            a: {questionText: clue_groups_double[3].clues.where(point_value: 400).first.question, answerText: clue_groups_double[3].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            b: {questionText: clue_groups_double[3].clues.where(point_value: 800).first.question, answerText: clue_groups_double[3].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            c: {questionText: clue_groups_double[3].clues.where(point_value: 1200).first.question, answerText: clue_groups_double[3].clues.where(point_value: 1200).first.answer, pointValue: 1200, status: "unopened"},
            d: {questionText: clue_groups_double[3].clues.where(point_value: 1600).first.question, answerText: clue_groups_double[3].clues.where(point_value: 1600).first.answer, pointValue: 1600, status: "unopened"},
            e: {questionText: clue_groups_double[3].clues.where(point_value: 2000).first.question, answerText: clue_groups_double[3].clues.where(point_value: 2000).first.answer, pointValue: 2000, status: "unopened"}
          },
          e: {
            a: {questionText: clue_groups_double[4].clues.where(point_value: 400).first.question, answerText: clue_groups_double[4].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            b: {questionText: clue_groups_double[4].clues.where(point_value: 800).first.question, answerText: clue_groups_double[4].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            c: {questionText: clue_groups_double[4].clues.where(point_value: 1200).first.question, answerText: clue_groups_double[4].clues.where(point_value: 1200).first.answer, pointValue: 1200, status: "unopened"},
            d: {questionText: clue_groups_double[4].clues.where(point_value: 1600).first.question, answerText: clue_groups_double[4].clues.where(point_value: 1600).first.answer, pointValue: 1600, status: "unopened"},
            e: {questionText: clue_groups_double[4].clues.where(point_value: 2000).first.question, answerText: clue_groups_double[4].clues.where(point_value: 2000).first.answer, pointValue: 2000, status: "unopened"}
          },
          f: {
            a: {questionText: clue_groups_double[5].clues.where(point_value: 400).first.question, answerText: clue_groups_double[5].clues.where(point_value: 400).first.answer, pointValue: 400, status: "unopened"},
            b: {questionText: clue_groups_double[5].clues.where(point_value: 800).first.question, answerText: clue_groups_double[5].clues.where(point_value: 800).first.answer, pointValue: 800, status: "unopened"},
            c: {questionText: clue_groups_double[5].clues.where(point_value: 1200).first.question, answerText: clue_groups_double[5].clues.where(point_value: 1200).first.answer, pointValue: 1200, status: "unopened"},
            d: {questionText: clue_groups_double[5].clues.where(point_value: 1600).first.question, answerText: clue_groups_double[5].clues.where(point_value: 1600).first.answer, pointValue: 1600, status: "unopened"},
            e: {questionText: clue_groups_double[5].clues.where(point_value: 2000).first.question, answerText: clue_groups_double[5].clues.where(point_value: 2000).first.answer, pointValue: 2000, status: "unopened"}
          }
        }
      }
    }
  end

  def sync_to_firebase
    firebase = Firebase::Client.new("https://leighjeopardy.firebaseio.com")
    firebase.set("/games/#{self.slug}", self.generate_initial_gamestate)
  end

end
