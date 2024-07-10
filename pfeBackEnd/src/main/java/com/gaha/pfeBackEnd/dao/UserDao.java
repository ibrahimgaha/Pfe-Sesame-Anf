package com.gaha.pfeBackEnd.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gaha.pfeBackEnd.entity.User;

@Repository
public interface UserDao extends CrudRepository<User, String> {
}
