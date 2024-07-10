package com.gaha.pfeBackEnd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gaha.pfeBackEnd.dao.RoleDao;
import com.gaha.pfeBackEnd.dao.UserDao;
import com.gaha.pfeBackEnd.entity.Role;
import com.gaha.pfeBackEnd.entity.User;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.management.relation.RoleNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

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
        

        Role intervenantRole = new Role();
        intervenantRole.setRoleName("Intervenant");
        intervenantRole.setRoleDescription("Default role for newly created record");
        roleDao.save(intervenantRole);

        User adminUser = new User();
        adminUser.setUserName("admin");
        adminUser.setUserPassword(getEncodePassword("admin"));
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

        User user = new User();
        user.setUserName("user");
        user.setUserPassword(getEncodePassword("user"));
        user.setUserFirstName("raj");
        user.setUserLastName("sharma");
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userDao.save(user);
        

        User intervenant = new User();
        intervenant.setUserName("interv123");
        intervenant.setUserPassword(getEncodePassword("interv@123"));
        intervenant.setUserFirstName("interv");
        intervenant.setUserLastName("interv");
        Set<Role> intervenantRoles = new HashSet<>();
        intervenantRoles.add(intervenantRole);
        intervenant.setRole(intervenantRoles);       
        userDao.save(intervenant);
    }
    
    	
  //New USER
    public User registerNewUser(User user) throws RoleNotFoundException {
        Role role = roleDao.findById("User")
                           .orElseThrow(() -> new RoleNotFoundException("User role not found"));
        
        Set<Role> userRoles = Stream.of(role)
                                     .collect(Collectors.toSet());

        user.setRole(userRoles);
        user.setUserPassword(getEncodePassword(user.getUserPassword()));
        
        return userDao.save(user);
    }
    
    //New INTERV
    public User registerNewIntervenant(User user) throws RoleNotFoundException {
        Role role = roleDao.findById("Intervenant")
                           .orElseThrow(() -> new RoleNotFoundException("User role not found"));
        
        Set<Role> userRoles = Stream.of(role)
                                     .collect(Collectors.toSet());

        user.setRole(userRoles);
        user.setUserPassword(getEncodePassword(user.getUserPassword()));
        
        return userDao.save(user);
    }

    public String getEncodePassword(String password) {
        return passwordEncoder.encode(password);
    }

}
