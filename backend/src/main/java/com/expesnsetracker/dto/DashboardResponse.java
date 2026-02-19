package com.expesnsetracker.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private Double totalIncome;
    private Double totalExpense;
    private Double balance;
    private List<CategorySummary> categorySummary;
	public Double getTotalIncome() {
		return totalIncome;
	}
	public void setTotalIncome(Double totalIncome) {
		this.totalIncome = totalIncome;
	}
	public Double getTotalExpense() {
		return totalExpense;
	}
	public void setTotalExpense(Double totalExpense) {
		this.totalExpense = totalExpense;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	public List<CategorySummary> getCategorySummary() {
		return categorySummary;
	}
	public void setCategorySummary(List<CategorySummary> categorySummary) {
		this.categorySummary = categorySummary;
	}
	public DashboardResponse(Double totalIncome, Double totalExpense, Double balance,
			List<CategorySummary> categorySummary) {
		super();
		this.totalIncome = totalIncome;
		this.totalExpense = totalExpense;
		this.balance = balance;
		this.categorySummary = categorySummary;
	}
	
	
    
    
}
