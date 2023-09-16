class UsersController < ApplicationController
    def create 
        user = User.create(user_params)

        if user.valid?
            session[:user_id] = user.id

            render json: user, status: :created
        else
            render json: { errors: [ "Invalid password or username" ] }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation, :image_url, :bio)
    end
end
