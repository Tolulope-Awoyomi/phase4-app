class IssueSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :category, :issues_with_comments

  def issues_with_comments
    object.comments.map { |comment| 
    {comment_id: comment.id,
    content: comment.content,
    username: comment.user.username,
    user_id: comment.user.id
    }
  }
end
