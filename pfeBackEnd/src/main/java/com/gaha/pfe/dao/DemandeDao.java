package com.gaha.pfe.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gaha.pfe.entity.AvisTechnique;
import com.gaha.pfe.entity.Demande;
import com.gaha.pfe.entity.StatutDemande;
import com.gaha.pfe.entity.TypeDemande;
@Repository
public interface DemandeDao extends CrudRepository<Demande, Long> {
	
    List<Demande> findByUser_UserName(String userName);
    
    List<Demande> findByStatus(StatutDemande status);
    List<Demande> findByTypeDemande(TypeDemande type);

    

}
