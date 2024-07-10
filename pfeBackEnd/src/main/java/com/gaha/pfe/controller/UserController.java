package com.gaha.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gaha.pfe.entity.User;
import com.gaha.pfe.service.UserService;

import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    
    

    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    @GetMapping("/user/{username}")
    public String getUsername(@PathVariable String username) {
        return userService.getUsername(username);
    }
 
    @PostMapping({"/registerNewUser"})
    public User registerNewUser(@RequestBody User user) {
    	return userService.registerNewUser(user);
    }

    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }
    
    @GetMapping("/current-user")
    public User getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return userService.getUserByUsername(username);
    }
    
    @PutMapping("/update-user")
    public User updateUser(@RequestBody User updatedUser) {
        return userService.updateUser(updatedUser);
    }
    
    
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");
        
        try {
            userService.changePassword(username, currentPassword, newPassword);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    
    
 // Endpoint for uploading profile image
    @PostMapping("/{userId}/profile-image")
    public ResponseEntity<?> uploadProfileImage(@PathVariable String userId, @RequestParam("image") MultipartFile image) {
        try {
            userService.uploadProfileImage(userId, image);
            return ResponseEntity.ok("Profile image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to upload profile image");
        }
    }

    // Endpoint for updating profile image
    @PutMapping("/{userId}/profile-image")
    public ResponseEntity<?> updateProfileImage(@PathVariable String userId, @RequestParam("image") MultipartFile image) {
        try {
            userService.updateProfileImage(userId, image);
            return ResponseEntity.ok("Profile image updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update profile image");
        }
    }
    
    
    @GetMapping("/getAllUsers")
    @PreAuthorize("hasRole('Admin')")
    public List<User> getAllUsers(@RequestParam (defaultValue="") String searchKey) {
        return userService.getAllUsers(searchKey);
    }
    
    
    
    
    
    
    
    
    
    @DeleteMapping("/{userId}/deleteUser")
    @PreAuthorize("hasRole('Admin')")
    public void deleteUser(@PathVariable String userId) {
        userService.deleteUserForAdmin(userId);
    }
    
    
    
    
    
    
    
    
    
    


    
    @PutMapping("/{id}/update-user-admin") 
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<User> updateUserForAdmin(@PathVariable("id") String id, @RequestBody User updatedUser) {
        User updatedUserData = userService.updateUserForAdmin(id, updatedUser); // Pass user ID and updated details
        return ResponseEntity.ok(updatedUserData);
    }

    

}
