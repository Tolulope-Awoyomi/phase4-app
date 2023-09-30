class Issue < ApplicationRecord
    has_many :comments, dependent: :destroy
    has_many :user, through: :comments

    validates :title, :description, :category, presence: true
end
