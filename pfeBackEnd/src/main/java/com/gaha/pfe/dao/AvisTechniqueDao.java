package com.gaha.pfe.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gaha.pfe.entity.AvisTechnique;
import com.gaha.pfe.entity.User;

@Repository
public interface AvisTechniqueDao extends CrudRepository<AvisTechnique, Long> {
    List<AvisTechnique> findByUser_UserName(String userName);

	List<AvisTechnique> findAll(Pageable pageable);
	
	public List<AvisTechnique> findByNomEquipementContainingIgnoreCaseOrQuestionContainingIgnoreCaseOrSelectedAvisTechniqueContainingIgnoreCase(String key1,String key2,String key3,Pageable pageable);
	
    void deleteByUser(User user);

}
