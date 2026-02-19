package com.expesnsetracker.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.expesnsetracker.dto.CategorySummary;
import com.expesnsetracker.dto.DashboardResponse;
import com.expesnsetracker.entity.TransactionType;
import com.expesnsetracker.entity.User;
import com.expesnsetracker.repository.ExpenseTransactionRepository;
import com.expesnsetracker.repository.UserRepository;
import com.expesnsetracker.security.SecurityUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ExpenseTransactionRepository transactionRepository;
    private final UserRepository userRepository;
    
    public DashboardService(ExpenseTransactionRepository transactionRepository,
    						UserRepository userRepository) {
    	this.transactionRepository = transactionRepository;
    	this.userRepository = userRepository;
    }

    public DashboardResponse getDashboard(LocalDate start, LocalDate end) {

        String email = SecurityUtils.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Double income = transactionRepository
                .sumByUserAndType(user.getId(), TransactionType.INCOME);

        Double expense = transactionRepository
                .sumByUserAndType(user.getId(), TransactionType.EXPENSE);

        Double balance = income - expense;

        List<CategorySummary> summary =
                transactionRepository.getCategorySummary(
                        user.getId(), start, end);

        return new DashboardResponse(income, expense, balance, summary);
    }
}
