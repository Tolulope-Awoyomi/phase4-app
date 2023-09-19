# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

puts "📚 Seeding student debt issues..."

# Sample data for student debt issues
issues_data = [
  {
    title: "Struggling with High Interest Rates",
    description: "I'm finding it difficult to manage my student loans with high interest rates. Any advice?",
    category: "Interest Rates"
  },
  {
    title: "Confused About Loan Forgiveness",
    description: "Can someone explain how loan forgiveness programs work? It seems complicated.",
    category: "Loan Forgiveness"
  },
  {
    title: "Considering Deferment Options",
    description: "I'm thinking of deferring my student loans due to financial difficulties. What are the pros and cons?",
    category: "Deferment"
  },
  {
    title: "Choosing the Right Repayment Plan",
    description: "How do I choose the best income-driven repayment plan for my financial situation?",
    category: "Repayment Plans"
  },
  {
    title: "Private vs. Federal Loans",
    description: "I'm torn between private and federal student loans. Which one is better?",
    category: "Loan Types"
  },
  {
    title: "Dealing with Defaulted Loans",
    description: "I need help dealing with defaulted student loans. What are my options?",
    category: "Default"
  },
  {
    title: "Avoiding Student Loan Scams",
    description: "Beware of student loan scams! Has anyone encountered these? Share your experiences.",
    category: "Scams"
  },
  {
    title: "Seeking Financial Counseling",
    description: "Is financial counseling a good option for managing student debt? Share your insights.",
    category: "Counseling"
  },
  {
    title: "Tips to Reduce College Costs",
    description: "Let's discuss strategies to reduce the overall cost of college education. Share your ideas!",
    category: "Cost Reduction"
  },
  {
    title: "Overcoming Repayment Challenges",
    description: "Share your experiences and tips on overcoming challenges in the student loan repayment process.",
    category: "Repayment"
  }
]

# Create student debt issues with realistic usernames, emails, and comments
issues_data.each do |issue_data|
  username = Faker::Internet.unique.user_name
  email = Faker::Internet.unique.safe_email
  password = Faker::Alphanumeric.alphanumeric(number: 6) # Generates a random alphanumeric password

  user = User.create(
    username: username,
    email: email,
    password: password,
    password_confirmation: password
  )

  comment = Comment.create(
    user_id: user.id,
    issue_id: Issue.create(issue_data).id,
    content: Faker::Lorem.paragraph
  )

  puts "Created issue '#{issue_data[:title]}' with comment by #{username}"
end

puts "✅ Done seeding student debt issues!"
