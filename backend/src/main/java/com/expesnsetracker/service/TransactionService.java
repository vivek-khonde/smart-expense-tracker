package com.expesnsetracker.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.expesnsetracker.dto.TransactionRequest;
import com.expesnsetracker.entity.Category;
import com.expesnsetracker.entity.ExpenseTransaction;
import com.expesnsetracker.entity.User;
import com.expesnsetracker.exception.ResourceNotFoundException;
import com.expesnsetracker.exception.UnauthorizedAccessException;

import com.expesnsetracker.repository.CategoryRepository;
import com.expesnsetracker.repository.ExpenseTransactionRepository;
import com.expesnsetracker.repository.UserRepository;
import com.expesnsetracker.security.SecurityUtils;

@Service
public class TransactionService {

    private final ExpenseTransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public TransactionService(
            ExpenseTransactionRepository transactionRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public ExpenseTransaction addTransaction(TransactionRequest request) {

        String email = SecurityUtils.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Cannot use this category");
        }

        ExpenseTransaction tx = new ExpenseTransaction();
        tx.setAmount(request.getAmount());
        tx.setDescription(request.getDescription());
        tx.setDate(request.getDate());
        tx.setType(request.getType());
        tx.setUser(user);
        tx.setCategory(category);

        return transactionRepository.save(tx);
    }

    public List<ExpenseTransaction> getUserTransactions() {

        String email = SecurityUtils.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return transactionRepository.findByUserId(user.getId());
    }

    public List<ExpenseTransaction> getTransactionsByDate(
            LocalDate start, LocalDate end) {

        String email = SecurityUtils.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return transactionRepository.findByUserIdAndDateBetween(
                user.getId(), start, end);
    }
     
    public void createTransaction(TransactionRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("Cannot use this category");
        }

    }
    
    public ExpenseTransaction updateTransaction(Long id, TransactionRequest request) {

        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ExpenseTransaction tx = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!tx.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Cannot use this category");
        }

        tx.setAmount(request.getAmount());
        tx.setDescription(request.getDescription());
        tx.setDate(request.getDate());
        tx.setType(request.getType());
        tx.setCategory(category);

        return transactionRepository.save(tx);
    }

    public void deleteTransaction(Long id) {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ExpenseTransaction tx = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!tx.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        transactionRepository.delete(tx);
    }


}

