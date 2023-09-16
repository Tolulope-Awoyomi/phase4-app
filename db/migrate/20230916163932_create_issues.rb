class CreateIssues < ActiveRecord::Migration[6.1]
  def change
    create_table :issues do |t|
      t.string :title
      t.string :description
      t.string :category

      t.timestamps
    end
  end
end
