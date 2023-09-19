class IssuesController < ApplicationController
    before_action :authorize, only: [:show, :create, :update, :destroy]

  def index
    issues = Issue.all
    render json: issues
  end

  def show
    issue = Issue.find_by(id: params[:id])
    render json: issue
  end

  def create
    issue = Issue.create(movie_params)
    render json: issue, status: :created
  end

  def update
    issue = Issue.find(params[:id])
    issue.update!(issue_params)
    render json: issue, status: 202
  end

  def destroy
    issue = Issue.find(params[:id])
    issue.destroy 
    head :no_content
  end

  
  private

  def issue_params
    params.permit(:title, :description, :category)
  end

  def authorize
    return render json: { errors: [ "Not authorized" ] }, status: :unauthorized unless session[:user_id]
  end

end
