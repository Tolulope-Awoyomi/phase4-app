class CommentsController < ApplicationController
    skip_before_action :authorize, only: [:show]

    def create 
        comment = @current_user.comments.create!(comment_params)
        render json: comment.issue, status: 201
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Comment not found' }, status: :not_found
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

    def authorize
        return render json: { errors: [ "Not authorized" ] }, status: :unauthorized unless session[:user_id]
    end
end
