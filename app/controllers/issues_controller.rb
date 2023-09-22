class IssuesController < ApplicationController
    skip_before_action :authorize, only: [:index]

  def index
    issues = Issue.all
    render json: issues
  end

  def show
    issue = Issue.find_by(id: params[:id])
    render json: issue
  end

  def create
    issue = Issue.create(issue_params)
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

end
