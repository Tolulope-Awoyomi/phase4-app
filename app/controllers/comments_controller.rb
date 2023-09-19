class CommentsController < ApplicationController
    skip_before_action :require_login, only: [:new, :create]

    def create 
        comment = @current_user.comments.create!(comment_params)
        render json: comment.issue, status: 201
    end

    def update 
        comment = @current_user.comments.find(params[:id])
        comment.update!(comment_params)
        render json: comment, status: 202
    end

    def destroy 
        comment = @current_user.comments.find(params[:id])
        comment.destroy 
        head :no_content
    end

    private
    def comment_params
        params.permit(:content :issue_id)
    end
end
