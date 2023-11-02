class CreateChatGptClients < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_gpt_clients do |t|

      t.timestamps
    end
  end
end
