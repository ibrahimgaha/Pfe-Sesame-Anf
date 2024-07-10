package com.gaha.pfeBackEnd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gaha.pfeBackEnd.entity.User;
import com.gaha.pfeBackEnd.service.UserService;

import javax.annotation.PostConstruct;
import javax.management.relation.RoleNotFoundException;

@RestController

public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    @PostMapping({"/registerNewIntervenant"})
    public User registerNewIntervenant(@RequestBody User user) throws RoleNotFoundException {
        return userService.registerNewIntervenant(user);
    }
    
    @PostMapping({"/registerNewUser"})
    public User registerNewUser(@RequestBody User user) throws RoleNotFoundException {
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
    
    @GetMapping({"/forIntervenant"})
    @PreAuthorize("hasRole('Intervenant')")

    public String forIntervenant(){
    return "This URL is only accessible to the Intervenant";
    }
}
