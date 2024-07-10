package com.gaha.pfe.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaha.pfe.dao.AvisTechniqueDao;
import com.gaha.pfe.entity.AvisTechnique;
import com.gaha.pfe.entity.AvisTechniqueStatus;

@Service 
public class AvisTechniqueStatisticsService {
	
	@Autowired
	private AvisTechniqueDao avisTechniqueRepo;
	
	public Map<AvisTechniqueStatus, Long> getAvisTechniqueStatusStatistics() {
	    List<AvisTechnique> avisTechniques = (List<AvisTechnique>) avisTechniqueRepo.findAll();
	    
	    // Group avisTechniques by status and count them
	    Map<AvisTechniqueStatus, Long> statusStatistics = avisTechniques.stream()
	        .collect(Collectors.groupingBy(AvisTechnique::getAvisTechniqueStatus, Collectors.counting()));
	    
	    return statusStatistics;
	}

}
