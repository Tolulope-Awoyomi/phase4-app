import React from 'react'

function Filter({ category, onCategoryChange }) {

  return (
    <div className='Filter'>
        <select
            name="filter"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
        >
          <label>Filter by Category</label>
            <option value="All">All</option>
            <option value="Interest Rates">Interest Rates</option>
            <option value="Loan Forgiveness">Loan Forgiveness</option>
            <option value="Deferment">Deferment</option>
            <option value="Repayment">Repayment</option>
            <option value="Repayment Plans">Repayment Plans</option>
            <option value="Loan Types">Loan Types</option>
            <option value="Default">Default</option> 
            <option value="Scams">Scams</option>
            <option value="Counseling">Counseling</option> 
            <option value="Cost Reduction">Cost Reduction</option> 
            <option value="Huge Student Debt">Huge Student Debt</option> 
        </select>
    </div>
  )
}

export default Filter;