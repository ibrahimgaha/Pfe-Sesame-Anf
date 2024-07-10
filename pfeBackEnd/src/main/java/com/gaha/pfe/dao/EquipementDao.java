package com.gaha.pfe.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gaha.pfe.entity.Equipement;
@Repository
public interface EquipementDao extends CrudRepository<Equipement, Long> {

}
