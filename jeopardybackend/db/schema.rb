# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151124081015) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.string   "comments"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clue_groups", force: :cascade do |t|
    t.integer  "category_id"
    t.integer  "jeopardy_game_id"
    t.string   "round"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "clues", force: :cascade do |t|
    t.integer  "clue_group_id"
    t.string   "question"
    t.string   "answer"
    t.integer  "point_value"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "games", force: :cascade do |t|
    t.string   "single_jeopardy_clue_groups"
    t.string   "double_jeopardy_clue_groups"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "slug"
  end

  create_table "jeopardy_games", force: :cascade do |t|
    t.date     "gamedate"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "jarchive_id"
    t.boolean  "game_exists"
  end

end
