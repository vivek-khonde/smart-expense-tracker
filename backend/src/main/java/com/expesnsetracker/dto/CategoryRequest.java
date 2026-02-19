package com.expesnsetracker.dto;

import com.expesnsetracker.entity.TransactionType;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {

    @NotBlank
    private String name;

    private TransactionType type;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public TransactionType getType() {
		return type;
	}

	public void setType(TransactionType type) {
		this.type = type;
	}
    
}

