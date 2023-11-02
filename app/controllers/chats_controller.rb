class ChatsController < ApplicationController
    before_action :validate_message, only: [:generate_response]
  
    def generate_response
      message = params[:prompt]
      response = ChatGptClient.generate_response(message)
  
      render json: { response: response }
    end
  
    private
  
    def validate_message
      unless params[:prompt].present?
        render json: { error: "Message can't be blank" }, status: :unprocessable_entity
      end
    end
  end
  