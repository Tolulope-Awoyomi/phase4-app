class User < ApplicationRecord
    has_many :comments, dependent: :destroy 
    has_many :issues, through: :comments
    
    has_secure_password
    
    validates :username, :email, :password, :password_confirmation, presence: true
    validates :username, uniqueness: true
    validates :password, confirmation: true
    validate :password_complexity
    
    
    def password_complexity
        if password.present? && !password.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{5,}$/)
            errors.add :password, "must be at least 5 characters long and contain at least one letter and one number."
        end
    end

end
