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
            if @user.update!(user_params_update)
                render json: @user, status: :accepted
            else
                render json: { errors: ["validation errors"]}, status: :unprocessable_entity
            end
        else
            render json: { errors: ["Scientist not found"]}, status: :not_found
        end
    end

    private

    def one_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.permit(:username, :email, :password, :password_confirmation, :image_url, :bio)
    end

    def user_params_update
        params.permit(:username, :email, :password, :password_confirmation, :image_url, :bio)
    end
end
