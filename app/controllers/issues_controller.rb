class IssuesController < ApplicationController
  skip_before_action :authorize, only: [:index]

  def index
    issues = Issue.all
    render json: issues
  end

  def show
    issue = Issue.find_by(id: params[:id])
    if issue
      render json: issue
    else
      render json: { error: 'Issue not found' }, status: :not_found
    end
  end

  def create
    issue = Issue.new(issue_params)
    if issue.save
      render json: issue, status: :created
    else
      render json: { errors: issue.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def issue_params
    params.permit(:title, :description, :category)
  end
end
