package com.fridge.fridgeproject.securities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 60 * 60 * 24)
public class RefreshToken {
    @Id
    private String userId;
    private String accessToken;
    private Long refreshToken;
}
