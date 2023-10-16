class CommentsController < ApplicationController
    before_action :set_current_user, only: [:create, :update, :destroy] 

    def create 
        comment = @current_user.comments.create(comment_params)
        if comment.save
            render json: comment, status: :created
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        comment = Comment.find(params[:id])
        if comment
            render json: comment, status: :ok
        else
            render json: { errors: comment.errors.full_messages }, status: :not_found
        end
    end

    def update 
        comment = @current_user.comments.find(params[:id])
        if comment
            if comment.update(comment_params)
                render json: comment, status: :ok
            else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { error: 'Comment not found' }, status: :not_found
        end
    end

    def destroy 
        comment = @current_user.comments.find(params[:id])
        if comment
            comment.destroy 
            head :no_content
        else
            render json: { error: 'Comment not found' }, status: :not_found
        end
    end
    

    private
    def comment_params
        params.permit(:content, :issue_id)
    end
    
    def set_current_user
        @current_user = User.find_by(id: session[:user_id])
      end

end

