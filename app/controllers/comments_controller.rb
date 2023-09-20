class CommentsController < ApplicationController
    before_action :set_current_user, :authorize, only: [:create, :update, :destroy]

    def create 
        comment = @current_user.comments.create!(comment_params)
        render json: comment.issue, status: 201
    end

    def show
        comment = Comment.find(params[:id])
        if comment
            render json: comment, status: :ok
        else
            render json: { error: 'Comment not found' }, status: :not_found
        end
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
        params.permit(:content, :issue_id)
    end
    
    def set_current_user
        @current_user = User.find_by(id: session[:user_id])
      end

    def authorize
        return render json: { errors: [ "Not authorized" ] }, status: :unauthorized unless session[:user_id]
    end
end
