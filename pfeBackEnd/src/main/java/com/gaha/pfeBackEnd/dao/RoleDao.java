package com.gaha.pfeBackEnd.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gaha.pfeBackEnd.entity.Role;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {

}
