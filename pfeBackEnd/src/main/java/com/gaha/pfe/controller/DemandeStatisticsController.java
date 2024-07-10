package com.gaha.pfe.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaha.pfe.entity.StatutDemande;
import com.gaha.pfe.entity.TypeDemande;
import com.gaha.pfe.service.DemandeStatisticsService;

@RestController
@RequestMapping("/statistics")
public class DemandeStatisticsController {

    @Autowired
    private DemandeStatisticsService statisticsService;

    @GetMapping("/status")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Map<StatutDemande, Long>> getStatusStatistics() {
        Map<StatutDemande, Long> statusStatistics = statisticsService.getStatusStatistics();
        return ResponseEntity.ok(statusStatistics);
    }

    @GetMapping("/type")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Map<TypeDemande, Long>> getTypeStatistics() {
        Map<TypeDemande, Long> typeStatistics = statisticsService.getTypeStatistics();
        return ResponseEntity.ok(typeStatistics);
    }
}
