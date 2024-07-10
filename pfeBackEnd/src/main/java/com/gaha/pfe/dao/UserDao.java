package com.gaha.pfe.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gaha.pfe.entity.User;

@Repository
public interface UserDao extends CrudRepository<User, String> {
    User findByUserName(String userName);

    List<User> findByUserNameContainingIgnoreCaseOrUserFirstNameContainingIgnoreCaseOrUserLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrAdresseContainingIgnoreCaseOrTelMobileContainingIgnoreCase(String searchKey1, String searchKey2, String searchKey3, String searchKey4, String searchKey5, String searchKey6);
}
