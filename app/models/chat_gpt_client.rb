require 'rest-client'

class ChatGptClient < ApplicationRecord
  BASE_URL = 'https://api.openai.com/v1/chat/completions'.freeze

  def self.generate_response(prompt)
    api_key = ENV['OPENAI_API_KEY']

    headers = {
      'Content-Type' => 'application/json',
      'Authorization' => "Bearer #{api_key}"
    }

    data = {
      'model' => 'gpt-3.5-turbo',
      'messages' => [
        { 'role' => 'system', 'content' => 'You are a helpful assistant.' },
        { 'role' => 'user', 'content' => prompt },
      ],
      'max_tokens' => 1000, # Length can be adjusted as needed
      'temperature' => 0.3 # Controls the randomness of the response, lower values make it more focused
    }

    begin 
      response = RestClient.post(BASE_URL, data.to_json, headers)
      result = JSON.parse(response.body)
      completions = result['choices'][0]['message']
      completions
    rescue RestClient::ExceptionWithResponse => e 
      puts "Error: #{e.response.code} - #{e.response}"
      nil
    end
  end
end
