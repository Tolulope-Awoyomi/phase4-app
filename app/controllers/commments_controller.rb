class CommmentsController < ApplicationController

    def create 
        user = User.find_by(id: params[:id])
        user.valid?
        comment = user.comment.create!(comment_params)
        if comment 
            render json: comment, status: :created
        else
            render json: { errors: "validation errors"}, status: :not_found
        end
    end

    def destroy
        user = User.find_by(id: params[:id])
            user.comment.destroy
            head :no_content, status: :deleted
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    private
    def comment_params
        params.permit(:content, :user_id, :issue_id)
    end
end
