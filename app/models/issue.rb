class Issue < ApplicationRecord
    has_many :comments, dependent: :destroy
    has_many :user, through: :comments
end
