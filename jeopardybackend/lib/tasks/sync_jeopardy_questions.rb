namespace :jeopardy do

  desc "Scrapes all jeopardy questions and syncs them to the database"
  task :sync_questions => :environment do

    require "open-uri"

    target_game_id = 4200
    game_url = "http://www.j-archive.com/showgame.php?game_id=#{target_game_id}"

    doc = Nokogiri::HTML(open(game_url))

    game_header = doc.at_css("#game_title h1")

    if game_header.present?
      game_date_display = game_header.text.gsub(/\A.*( - )/, "")
      game_date = DateTime.strptime(game_date_display, "%A, %B %e, %Y")

      jeopardy_game = JeopardyGame.create(gamedate: game_date)

      rounds = doc.css("table.round")
      single_jeopardy = rounds[0]
      double_jeopardy = rounds[1]

      # SINGLE JEOPARDY
      # ====================================================

      single_jeopardy_categories = single_jeopardy.css("td.category")
      categories = single_jeopardy_categories.map do |single_jeopardy_category|
        Category.find_or_create_by(name: single_jeopardy_category.at_css("td.category_name").try(:text), comments: single_jeopardy_category.at_css("td.category_comments").try(:text))
      end

      clue_group1 = ClueGroup.create(category: categories[0], round: 'single', jeopardy_game: jeopardy_game)
      clue_group2 = ClueGroup.create(category: categories[1], round: 'single', jeopardy_game: jeopardy_game)
      clue_group3 = ClueGroup.create(category: categories[2], round: 'single', jeopardy_game: jeopardy_game)
      clue_group4 = ClueGroup.create(category: categories[3], round: 'single', jeopardy_game: jeopardy_game)
      clue_group5 = ClueGroup.create(category: categories[4], round: 'single', jeopardy_game: jeopardy_game)
      clue_group6 = ClueGroup.create(category: categories[5], round: 'single', jeopardy_game: jeopardy_game)

      single_jeopardy_clues_data = single_jeopardy.css("td.clue")
      single_jeopardy_clues_data.each_with_index do |single_jeopardy_clue, index|
        question_text = single_jeopardy_clue.at_css(".clue_text").try(:text)
        answer_text = single_jeopardy_clue.at_css("div[onmouseover]").present? ? single_jeopardy_clue.at_css("div[onmouseover]")["onmouseover"].match(/">.*<\/em>/).to_s.gsub(/^">/, "").gsub(/<\/em>|<i>|<\/i>/, "") : nil

        point_value = nil
        case index
        when 0..5 then point_value = 200
        when 6..11 then point_value = 400
        when 12..17 then point_value = 600
        when 18..23 then point_value = 800
        when 24..29 then point_value = 1000
        end

        clue_group_id = nil
        case index % 6
        when 0 then clue_group_id = clue_group1.id
        when 1 then clue_group_id = clue_group2.id
        when 2 then clue_group_id = clue_group3.id
        when 3 then clue_group_id = clue_group4.id
        when 4 then clue_group_id = clue_group5.id
        when 5 then clue_group_id = clue_group6.id
        end

        Clue.create(point_value: point_value,
                    question: question_text,
                    answer: answer_text,
                    clue_group_id: clue_group_id)

      end

      # DOUBLE JEOPARDY
      # ====================================================

      double_jeopardy_categories = double_jeopardy.css("td.category")
      double_categories = double_jeopardy_categories.map do |double_jeopardy_category|
        Category.find_or_create_by(name: double_jeopardy_category.at_css("td.category_name").try(:text), comments: double_jeopardy_category.at_css("td.category_comments").try(:text))
      end

      double_clue_group1 = ClueGroup.create(category: double_categories[0], round: "double", jeopardy_game: jeopardy_game)
      double_clue_group2 = ClueGroup.create(category: double_categories[1], round: "double", jeopardy_game: jeopardy_game)
      double_clue_group3 = ClueGroup.create(category: double_categories[2], round: "double", jeopardy_game: jeopardy_game)
      double_clue_group4 = ClueGroup.create(category: double_categories[3], round: "double", jeopardy_game: jeopardy_game)
      double_clue_group5 = ClueGroup.create(category: double_categories[4], round: "double", jeopardy_game: jeopardy_game)
      double_clue_group6 = ClueGroup.create(category: double_categories[5], round: "double", jeopardy_game: jeopardy_game)

      double_jeopardy_clues_data = double_jeopardy.css("td.clue")
      double_jeopardy_clues_data.each_with_index do |double_jeopardy_clue, index|
        question_text = double_jeopardy_clue.at_css(".clue_text").try(:text)
        answer_text = double_jeopardy_clue.at_css("div[onmouseover]").present? ? double_jeopardy_clue.at_css("div[onmouseover]")["onmouseover"].match(/">.*<\/em>/).to_s.gsub(/^">/, "").gsub(/<\/em>|<i>|<\/i>/, "") : nil

        point_value = nil
        case index
        when 0..5 then point_value = 400
        when 6..11 then point_value = 800
        when 12..17 then point_value = 1200
        when 18..23 then point_value = 1600
        when 24..29 then point_value = 2000
        end

        clue_group_id = nil
        case index % 6
        when 0 then clue_group_id = double_clue_group1.id
        when 1 then clue_group_id = double_clue_group2.id
        when 2 then clue_group_id = double_clue_group3.id
        when 3 then clue_group_id = double_clue_group4.id
        when 4 then clue_group_id = double_clue_group5.id
        when 5 then clue_group_id = double_clue_group6.id
        end

        Clue.create(point_value: point_value,
                    question: question_text,
                    answer: answer_text,
                    clue_group_id: clue_group_id)
      end

      puts "Scraped Game Data for ID: #{target_game_id}"

    else
      puts "SKIPPED ID: #{target_game_id} -- DOESN'T EXIST"
    end

  end

end
