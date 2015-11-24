class GamesController < ApplicationController

  def board
    @game = Game.find_by_slug(params[:slug])
  end

  def admin
    @game = Game.find_by_slug(params[:slug])
  end

  def player
    @game = Game.find_by_slug(params[:slug])
  end

end
