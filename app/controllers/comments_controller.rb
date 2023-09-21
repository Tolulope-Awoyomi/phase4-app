class CommentsController < ApplicationController
    before_action :set_current_user, :authorize, only: [:create, :update, :destroy]

    def index
        comments = Comment.all
        render json: comments
    end

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

    def word
        input_word = params[:word].downcase
        found_word = Comment.where("lower(content) LIKE ?", "%#{input_word}%") 
        # found_word = Comment.all.fiter()
        if found_word.any?
            users = found_word.map{ |comment| comment.user }
            render json:  users, status: :ok
        else
            render json: { errors: [ "could not find #{input_word}" ]}
        end
    end

    private
    def comment_params
        params.permit(:content, :issue_id)
    end
    
    def set_current_user
        @current_user = User.find_by(id: session[:user_id])
      end

    def authorize
        return render json: { errors: [ "Please login or create an account" ] }, status: :unauthorized unless session[:user_id]
    end
end

# Make a custom route that takes a parameter of a word. The user will make a request with a specific word and your API should return an array of user objects who used that word in the content of any of their comments. If no comments have that word in their content return a JSON message that says so. Your search of content attributes should be fuzzy - in other words, case-insensitive and partial hits should still count. For instance, if the user submits “sun” and the word “Sunday” is in the content of the comment that counts as a match.