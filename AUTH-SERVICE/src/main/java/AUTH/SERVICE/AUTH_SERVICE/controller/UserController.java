package AUTH.SERVICE.AUTH_SERVICE.controller;


import AUTH.SERVICE.AUTH_SERVICE.DTO.LoginRequest;
import AUTH.SERVICE.AUTH_SERVICE.DTO.RegisterRequest;
import AUTH.SERVICE.AUTH_SERVICE.service.AuthService;
import AUTH.SERVICE.AUTH_SERVICE.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @GetMapping("/abc")
    public String getService(){
        return "AUTH_SERVICE abc";
    }

    @Autowired
    private  AuthService authService;
    @Autowired
    private  JwtUtil jwtUtil;

    @PostMapping("/user/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);

        Claims claims = jwtUtil.validateToken(token);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", claims.get("email"));
        response.put("role", claims.get("role"));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validate(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.replace("Bearer ", "");
            Claims claims = jwtUtil.validateToken(jwt);

            Map<String, Object> response = new HashMap<>();
            response.put("userId",claims.get("userId"));
            response.put("status", "VALID");
            response.put("email", claims.get("email"));
            response.put("userId", claims.get("userId"));
            response.put("roles", claims.get("role"));
            response.put("expiry", claims.getExpiration());

            return ResponseEntity.ok(response);

        } catch (ExpiredJwtException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "EXPIRED", "message", "Token expired"));

        } catch (JwtException ex) {  // Covers signature errors, malformed token, tampering
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "INVALID", "message", "Invalid token"));

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "ERROR", "message", ex.getMessage()));
        }
    }
}
