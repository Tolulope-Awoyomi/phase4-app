class CommentsController < ApplicationController
    before_action :authenticate_user!
    
    def create 
        # Find the user by their ID
        user = User.find_by(id: params[:user_id])

        # Check if the user exists
        if user.nil?
            render json: { errors: "User not found" }, status: :not_found
            return
        end

        # Create a comment associated with the user
        comment = user.comments.create(comment_params)

        if comment.valid?
            render json: comment, status: :created
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        # Find the user by their ID
        user = User.find_by(id: params[:user_id])

        # Check if the user exists
        if user.nil?
            render json: { errors: "User not found" }, status: :not_found
            return
        end

        # Find the comment by its ID associated with the user
        comment = user.comments.find_by(id: params[:id])

        if comment
            comment.destroy
            head :no_content
        else
            render json: { error: "Comment not found" }, status: :not_found
        end
    end


    private
    def comment_params
        params.permit(:content :issue_id)
    end
end
