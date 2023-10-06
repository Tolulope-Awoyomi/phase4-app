class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :issue

    validates :content, presence: true

    def username
        self.user.username
    end
end
