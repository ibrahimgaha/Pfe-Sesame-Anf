package com.gaha.pfe.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gaha.pfe.entity.Role;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {

}
