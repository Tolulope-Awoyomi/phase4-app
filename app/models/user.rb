class User < ApplicationRecord
    has_secure_password
    validates :username, :email, :password, :password_confirmation, presence: true
    validates :username, uniqueness: true
    validate :password_complexity
    validates :password, confirmation: true
    has_many :comments, dependent: :destroy 
    has_many :issues, through: :comments
    
    def password_complexity
        if password.present? && !password.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{5,}$/)
            errors.add :password, "must include at least one letter and one number and be at least 5 characters long"
        end
    end

end
