package maile.com.example.mailer.dto;

import maile.com.example.mailer.entity.User;

public class AuthResponse {
    
    private String message;
    private UserInfo user;
    private boolean success;
    private String token;
    
    public AuthResponse() {}
    
    public AuthResponse(String message, UserInfo user, boolean success) {
        this.message = message;
        this.user = user;
        this.success = success;
    }
    
    public AuthResponse(String message, UserInfo user, boolean success, String token) {
        this.message = message;
        this.user = user;
        this.success = success;
        this.token = token;
    }
    
    public static AuthResponse success(String message, User user) {
        return new AuthResponse(message, user != null ? UserInfo.fromUser(user) : null, true);
    }
    
    public static AuthResponse success(String message) {
        return new AuthResponse(message, null, true);
    }
    
    public static AuthResponse success(String message, User user, String token) {
        return new AuthResponse(message, user != null ? UserInfo.fromUser(user) : null, true, token);
    }
    
    public static AuthResponse error(String message) {
        return new AuthResponse(message, null, false);
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public UserInfo getUser() {
        return user;
    }
    
    public void setUser(UserInfo user) {
        this.user = user;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public static class UserInfo {
        private Long id;
        private String email;
        private String firstName;
        private String lastName;
        private String role;
        
        public UserInfo() {}
        
        public UserInfo(Long id, String email, String firstName, String lastName, String role) {
            this.id = id;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.role = role;
        }
        
        public static UserInfo fromUser(User user) {
            return new UserInfo(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().name()
            );
        }
        
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
        
        public String getFirstName() {
            return firstName;
        }
        
        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }
        
        public String getLastName() {
            return lastName;
        }
        
        public void setLastName(String lastName) {
            this.lastName = lastName;
        }
        
        public String getRole() {
            return role;
        }
        
        public void setRole(String role) {
            this.role = role;
        }
    }
} 