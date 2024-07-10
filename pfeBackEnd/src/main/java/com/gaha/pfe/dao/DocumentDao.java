package com.gaha.pfe.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gaha.pfe.entity.Document;
@Repository
public interface DocumentDao extends CrudRepository<Document, Long> {

}
