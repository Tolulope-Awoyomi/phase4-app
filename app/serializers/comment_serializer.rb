class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :issue_id, :username

  belongs_to :user
  belongs_to :issue
end

