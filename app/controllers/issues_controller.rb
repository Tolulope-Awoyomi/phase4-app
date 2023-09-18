class IssuesController < ApplicationController
    before_action :set_issue, only: %i[ show update destroy ]
    before_action :authenticate_user!, except: [:index, :show]


  # GET /issues
  def index
    issues = Issue.all
    render json: issues
  end

  def show
    render json: @issue
  end

  def create
    issue = Issue.create!(issue_params)
    if issue
      render json: issue, status: :created
    else
      render json: { errors: ["validation errors"] }, status: :unprocessable_entity
    end
  end

  def update
    if @issue 
      if @issue.update(issue_params_update)
        render json: @issue, status: :accepted
      else
        render json: { errors: @issue.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: ["Issue not found"] }, status: :not_found
    end
  end

  def destroy
    if @issue
      @issue.destroy
      head :no_content
    else
      render json: { error: "Issue not found" }, status: :not_found
    end
  end

  
  private
  def set_issue
    @issue = Issue.find_by(id: params[:id])
  end

  def issue_params
    params.permit(:title, :description, :category)
  end

  def issue_params_update
    params.permit(:title, :description, :category)
  end

end
