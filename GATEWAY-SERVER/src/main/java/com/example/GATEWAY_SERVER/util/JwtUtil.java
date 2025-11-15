package com.example.GATEWAY_SERVER.util;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret; // set in application.yml

    /**
     * Validates token and returns Claims if valid.
     * Throws JwtException (or subclass) if invalid/expired.
     */
    public Claims validateToken(String token) throws JwtException {
        return Jwts.parser()
                .setSigningKey(secret.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }
}
