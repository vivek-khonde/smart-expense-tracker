package com.expesnsetracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.expesnsetracker.dto.CategoryRequest;
import com.expesnsetracker.entity.Category;
import com.expesnsetracker.entity.User;
import com.expesnsetracker.repository.CategoryRepository;
import com.expesnsetracker.repository.UserRepository;
import com.expesnsetracker.security.SecurityUtils;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(CategoryRepository categoryRepository,
                           UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public Category createCategory(CategoryRequest request) {

        String email = SecurityUtils.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = new Category();
        category.setName(request.getName());
        category.setType(request.getType());
        category.setUser(user);

        return categoryRepository.save(category);
    }

    public List<Category> getUserCategories() {

        String email = SecurityUtils.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return categoryRepository.findByUserId(user.getId());
    }
    
    public Category updateCategory(Long id, CategoryRequest request) {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        category.setName(request.getName());
        category.setType(request.getType());

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        categoryRepository.delete(category);
    }

}
