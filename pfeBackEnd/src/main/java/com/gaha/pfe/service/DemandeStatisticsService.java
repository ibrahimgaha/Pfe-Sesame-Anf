package com.gaha.pfe.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaha.pfe.dao.DemandeDao;
import com.gaha.pfe.entity.Demande;
import com.gaha.pfe.entity.StatutDemande;
import com.gaha.pfe.entity.TypeDemande;

@Service
public class DemandeStatisticsService {

	@Autowired
	private DemandeDao demandeRepo;
	 
	 public Map<StatutDemande, Long> getStatusStatistics() {
	        List<Demande> demandes = (List<Demande>) demandeRepo.findAll();
	        
	        // Group demandes by status and count them
	        Map<StatutDemande, Long> statusStatistics = demandes.stream()
	            .collect(Collectors.groupingBy(Demande::getStatus, Collectors.counting()));
	        
	        return statusStatistics;
	    }

	    public Map<TypeDemande, Long> getTypeStatistics() {
	        List<Demande> demandes = (List<Demande>) demandeRepo.findAll();
	        
	        // Group demandes by type and count them
	        Map<TypeDemande, Long> typeStatistics = demandes.stream()
	            .collect(Collectors.groupingBy(Demande::getTypeDemande, Collectors.counting()));
	        
	        return typeStatistics;
	    }
	 
}
