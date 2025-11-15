package AUTH.SERVICE.AUTH_SERVICE.service;


import AUTH.SERVICE.AUTH_SERVICE.DTO.LoginRequest;
import AUTH.SERVICE.AUTH_SERVICE.DTO.RegisterRequest;
import AUTH.SERVICE.AUTH_SERVICE.model.UserC;
import AUTH.SERVICE.AUTH_SERVICE.repo.UserRepository;
import AUTH.SERVICE.AUTH_SERVICE.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent())
            throw new RuntimeException("Email already exists");

        UserC user = UserC.builder()

                .email(request.getEmail())
                .role("USER")
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);
        return "User registered successfully!";
    }

    public String login(LoginRequest request) {

        UserC user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email or Password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid Email or Password");

        return jwtUtil.generateToken(user);
    }
}
