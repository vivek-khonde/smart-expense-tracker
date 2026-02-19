package com.expesnsetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategorySummary {

    private String categoryName;
    private Double totalAmount;
    
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public CategorySummary(String categoryName, Double totalAmount) {
		super();
		this.categoryName = categoryName;
		this.totalAmount = totalAmount;
	}
    
    
}

