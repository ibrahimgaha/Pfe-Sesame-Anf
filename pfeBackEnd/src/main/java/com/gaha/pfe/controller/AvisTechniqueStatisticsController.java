package com.gaha.pfe.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaha.pfe.dao.AvisTechniqueDao;
import com.gaha.pfe.entity.AvisTechniqueStatus;
import com.gaha.pfe.service.AvisTechniqueStatisticsService;

@RestController
@RequestMapping("/statisticsAvis")
public class AvisTechniqueStatisticsController {

	@Autowired
	private AvisTechniqueStatisticsService avisTechniqueStatisticsService;
	
	@GetMapping("/avis-technique-status")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<Map<AvisTechniqueStatus, Long>> getAvisTechniqueStatusStatistics() {
	    Map<AvisTechniqueStatus, Long> statusStatistics = avisTechniqueStatisticsService.getAvisTechniqueStatusStatistics();
	    return ResponseEntity.ok(statusStatistics);
	}

}
