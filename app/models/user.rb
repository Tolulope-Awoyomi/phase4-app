class User < ApplicationRecord
    has_secure_password
    has_many :comments, dependent: :destory 
    has_many :issues, through: comments
end
