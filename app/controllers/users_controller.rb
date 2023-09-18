class UsersController < ApplicationController

    before_action :one_user, only: [:show, :update, :destroy]

    def create
        user = User.create(user_params)

        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show 
        user = User.find_by(id: session[:user_id])
        if user 
            render json: user
        else
            render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end

    def update
        if @user 
            if @user.update(user_params)
                render json: @user, status: :accepted
            else
                render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: ["User not found"]}, status: :not_found
        end
    end

    def destroy
        if @user 
            @user.destroy
            head :no_content, status: :deleted
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    private

    def one_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.permit(:username, :email, :password, :password_confirmation, :image_url, :bio)
    end

end
