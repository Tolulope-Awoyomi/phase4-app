class ChatsController < ApplicationController
    def generate_response
        message = params[:prompt]
        response = ChatGptClient.generate_response(message)

        render json: {response: response}
    end
end
