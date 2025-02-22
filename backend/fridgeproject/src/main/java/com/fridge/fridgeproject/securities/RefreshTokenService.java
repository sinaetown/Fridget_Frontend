package com.fridge.fridgeproject.securities;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    public void saveRefreshToken(String userId, String refreshToken) {
        redisTemplate.opsForValue().set(userId, refreshToken, refreshExpiration, TimeUnit.SECONDS);
    }

    public String getRefreshToken(String email) {
        return redisTemplate.opsForValue().get(email);
    }

    public void deleteRefreshToken(String email) {
        redisTemplate.delete(email);
    }

}
