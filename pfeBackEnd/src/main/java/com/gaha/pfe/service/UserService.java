package com.gaha.pfe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gaha.pfe.dao.AvisTechniqueDao;
import com.gaha.pfe.dao.RoleDao;
import com.gaha.pfe.dao.UserDao;
import com.gaha.pfe.entity.Role;
import com.gaha.pfe.entity.User;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;
    
    @Autowired
    private AvisTechniqueDao avisDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUserName("admin");
        adminUser.setUserPassword(getEncodedPassword("admin"));
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        adminUser.setIdFiscal("0000001GPN000");
        adminUser.setTelFixe("75147258");
        adminUser.setTelMobile("98542549");
        adminUser.setAdresse("ariana");
        adminUser.setEmail("test.test@gmail.com");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

//        User user = new User();
//        user.setUserName("raj123");
//        user.setUserPassword(getEncodedPassword("raj@123"));
//        user.setUserFirstName("raj");
//        user.setUserLastName("sharma");
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
//        userDao.save(user);
    }
    
    public User registerNewUser(User user) {
    	Role role = roleDao.findById("User").get();
    	Set<Role> roleSet=new HashSet<>();
    	roleSet.add(role);
    	user.setRole(roleSet);
    	String password = getEncodedPassword(user.getUserPassword());
    	user.setUserPassword(password);
    	return userDao.save(user);
    }
    
    public String getUsername(String username) {
        User user = userDao.findByUserName(username);
        if (user != null) {
            return user.getUserName();
        } else {
            return null;
        }
    }
    
    
    public String getEncodedPassword(String password) {
    	return passwordEncoder.encode(password);
    }
    
    
    public User getUserByUsername(String username) {
        return userDao.findByUserName(username);
    }
    
    public User updateUser(User updatedUser) {
        // Fetch the existing user from the database
        User existingUser = userDao.findByUserName(updatedUser.getUserName());

        // Update the fields of the existing user with the new data
        existingUser.setUserFirstName(updatedUser.getUserFirstName());
        existingUser.setUserLastName(updatedUser.getUserLastName());
        existingUser.setAdresse(updatedUser.getAdresse());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setTelFixe(updatedUser.getTelFixe());
        existingUser.setTelMobile(updatedUser.getTelMobile());

        // Save the updated user back to the database
        return userDao.save(existingUser);
    }
    
    public void changePassword(String username, String currentPassword, String newPassword) throws Exception {
        // Retrieve user by username
        User user = userDao.findByUserName(username);
        if (user == null) {
            throw new Exception("User not found");
        }

        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getUserPassword())) {
            throw new Exception("Current password is incorrect");
        }

        // Encode and set new password
        user.setUserPassword(passwordEncoder.encode(newPassword));
        userDao.save(user);
    }
    
    
 // Method to upload profile image
    public void uploadProfileImage(String userId, MultipartFile image) {
        User user = userDao.findById(userId)
                                   .orElseThrow();
        try {
            user.setProfileImage(image.getBytes());
            userDao.save(user);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile image", e);
        }
    }


    // Method to update profile image
 // Method to update profile image
    public void updateProfileImage(String userId, MultipartFile image) {
        uploadProfileImage(userId, image);
    }
    
    
    public List<User> getAllUsers(String searchKey) {
    	if (searchKey.equals("")) {
            return (List<User>) userDao.findAll();
        } else {
            return userDao.findByUserNameContainingIgnoreCaseOrUserFirstNameContainingIgnoreCaseOrUserLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrAdresseContainingIgnoreCaseOrTelMobileContainingIgnoreCase(searchKey, searchKey, searchKey, searchKey, searchKey, searchKey);
        }
    }    
    
    @Transactional
    public void deleteUserForAdmin(String userId) {
        // Retrieve the user entity from the database
        User user = userDao.findById(userId)
                           .orElseThrow(() -> new NoSuchElementException("User not found"));

        // Delete associated AvisTechnique records
        avisDao.deleteByUser(user);

        // Delete the user
        userDao.delete(user);
    }


    
    public User updateUserForAdmin(String id, User updatedUserDetails) {
        Optional<User> userOptional = userDao.findById(id);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
           
            existingUser.setUserFirstName(updatedUserDetails.getUserFirstName());
            existingUser.setUserLastName(updatedUserDetails.getUserLastName());
            existingUser.setAdresse(updatedUserDetails.getAdresse());
            existingUser.setEmail(updatedUserDetails.getEmail());
            existingUser.setTelFixe(updatedUserDetails.getTelFixe());
            existingUser.setTelMobile(updatedUserDetails.getTelMobile());

            // Save the updated user
            return userDao.save(existingUser);
        } else {
            throw new NoSuchElementException("User with ID " + id + " not found");
        }
    }


    

    

}
