package com.fridge.fridgeproject.securities;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    private final RefreshTokenService refreshTokenService;
    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private int accessTokenExpiration;

    @Value("${jwt.refresh-expiration}")
    private int refreshTokenExpiration;

    public JwtTokenProvider(RefreshTokenService refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }

    public String createAccessToken(String userId, String role) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("role", role);
        Date now = new Date();
        JwtBuilder jwtBuilder = Jwts.builder();
        jwtBuilder.setClaims(claims);
        jwtBuilder.setIssuedAt(now);
        jwtBuilder.setExpiration(new Date(now.getTime() + accessTokenExpiration * 1000L)); // 30초
        jwtBuilder.signWith(SignatureAlgorithm.HS256, secretKey);
        return jwtBuilder.compact();
    }

    public String createRefreshToken(String userId) {
        Date now = new Date();
        JwtBuilder jwtBuilder = Jwts.builder();
        jwtBuilder.setSubject(userId);
        jwtBuilder.setIssuedAt(now);
        jwtBuilder.setExpiration(new Date(now.getTime() + refreshTokenExpiration * 1000L));
        jwtBuilder.signWith(SignatureAlgorithm.HS256, secretKey);
        return jwtBuilder.compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            return false; //토큰 만료
        } catch (Exception e) {
            return false; //토큰 손상
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            Date expiration = Jwts.parser().setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();
            return expiration.before(new Date());
        } catch (ExpiredJwtException e) {
            return true; //토큰 만료
        } catch (Exception e) {
            return false; //토큰 손상
        }
    }

    public Claims getClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

}
