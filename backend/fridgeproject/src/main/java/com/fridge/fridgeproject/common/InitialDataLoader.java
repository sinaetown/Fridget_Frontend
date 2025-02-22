package com.fridge.fridgeproject.common;

import com.fridge.fridgeproject.user.Role;
import com.fridge.fridgeproject.user.User;
import com.fridge.fridgeproject.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class InitialDataLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public InitialDataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUserId("admin").isEmpty()) {
            User admin = User.builder()
                    .name("Admin")
                    .userId("admin")
                    .userPassword(passwordEncoder.encode("1234"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
        }
    }
}