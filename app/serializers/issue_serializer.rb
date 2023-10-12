class IssueSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :category, :issues_with_comments

  def issues_with_comments
    object.comments.map { |comment| 
      {id: comment.id,
      content: comment.content,
      username: comment.user.username,
      issue_id: comment.issue_id,
      user_id: comment.user.id
      }
    }
  end
end
