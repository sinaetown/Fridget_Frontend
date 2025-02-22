package com.fridge.fridgeproject.user;

import com.fridge.fridgeproject.user.dto.LoginReqDto;
import com.fridge.fridgeproject.user.dto.UserCreateReqDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        List<User> users = userRepository.findAll();
        return users;
//        return users.stream().map(m -> UserResDto.toUserResDto(m)).collect(Collectors.toList());
    }

    public User create(UserCreateReqDto userCreateReqDto) {
        if (userRepository.findByUserId(userCreateReqDto.getUserId()).isPresent()) {
            throw new IllegalArgumentException("UserID is already in use.");
        }
        userCreateReqDto.setUserPassword(passwordEncoder.encode(userCreateReqDto.getUserPassword()));
        User user = User.toEntity(userCreateReqDto);
        return userRepository.save(user);
    }

    public User login(LoginReqDto loginReqDto) throws IllegalArgumentException {
        User user = userRepository.findByUserId(loginReqDto.getUserId()).orElseThrow(()
                -> new IllegalArgumentException("Login Failed! There's no such user."));
        if (!passwordEncoder.matches(loginReqDto.getUserPassword(), user.getUserPassword())) {
            throw new IllegalArgumentException("Wrong password!");
        }
        return user;
    }
}
