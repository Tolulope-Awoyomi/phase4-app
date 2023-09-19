class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :issue_id

  belongs_to :user
  belongs_to :issue
end

