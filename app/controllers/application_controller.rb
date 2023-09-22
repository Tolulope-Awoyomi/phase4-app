class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize

  def authorize
    return render json: { errors: [ "Please login or create an account" ] }, status: :unauthorized unless session[:user_id]
  end

end
