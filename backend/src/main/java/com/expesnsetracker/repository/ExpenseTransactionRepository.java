package com.expesnsetracker.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.expesnsetracker.dto.CategorySummary;
import com.expesnsetracker.entity.ExpenseTransaction;
import com.expesnsetracker.entity.TransactionType;

public interface ExpenseTransactionRepository extends JpaRepository<ExpenseTransaction, Long> {

	List<ExpenseTransaction> findByUserId(Long userId);
	
	List<ExpenseTransaction> findByUserIdAndDateBetween(
			Long userId,
			LocalDate startDate,
			LocalDate enddate
		);
	
	
	@Query("SELECT COALESCE(SUM(t.amount),0) FROM ExpenseTransaction t " +
		       "WHERE t.user.id = :userId AND t.type = :type")
		Double sumByUserAndType(Long userId, TransactionType type);
	
	
	@Query("SELECT new com.expesnsetracker.dto.CategorySummary(c.name, SUM(t.amount)) " +
		       "FROM ExpenseTransaction t JOIN t.category c " +
		       "WHERE t.user.id = :userId AND t.date BETWEEN :start AND :end " +
		       "GROUP BY c.name")
		List<CategorySummary> getCategorySummary(Long userId,
		                                         LocalDate start,
		                                         LocalDate end);
	
	


}
