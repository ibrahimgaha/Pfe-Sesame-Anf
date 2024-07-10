package com.gaha.pfe.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.gaha.pfe.entity.AvisTechnique;
import com.gaha.pfe.entity.Demande;
import com.gaha.pfe.entity.Document;
import com.gaha.pfe.entity.Equipement;
import com.gaha.pfe.entity.StatutDemande;
import com.gaha.pfe.entity.TypeDemande;
import com.gaha.pfe.service.DemandeService;

@RestController
@RequestMapping("/demande")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;

    @PostMapping(value = "/requestHomologation", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('User')")
    public Demande addNewDemandeHomologation(@RequestPart("demande") Demande request,
                                             @RequestPart("files") MultipartFile[] files,
                                             @RequestPart("equipements") Set<Equipement> equipements) {
        try {
            // Generate or set the ID for the demande object
            Long requestId = generateOrSetId(request);

            // Upload documents and create Document objects
            Set<Document> documents = uploadDocuments(files);

            // Set the documents and equipements on the demande object
            request.setDocuments(documents);
            request.setEquipement(equipements);

            // Save the demande with associated documents and equipements
            return demandeService.addNewDemandeHomologation(request, documents, equipements, files); // Include files parameter
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    //UPLOAD_Files
    private Set<Document> uploadDocuments(MultipartFile[] multipartFiles) throws IOException {
        Set<Document> documents = new HashSet<>();
        for (MultipartFile file : multipartFiles) {
            Document document = new Document();
            document.setNom_Document(file.getOriginalFilename());
            document.setDesc_Document(""); // Assuming you have a description field, modify as needed
            document.setData(file.getBytes());
            documents.add(document);
        }
        return documents;
    }
    
    //GENERATE_ID
    
    private Long generateOrSetId(Demande request) {
        // Check if the request object already has an ID
        if (request.getId() != null) {
            return request.getId(); // Return the existing ID
        } else {
            // Generate a new ID or set it as appropriate
            // For example, you can use a timestamp-based ID, or UUID.randomUUID() for a random ID
            // Here's an example using a timestamp-based ID:
            Long generatedId = System.currentTimeMillis();
            request.setId(generatedId); // Set the generated ID on the request object
            return generatedId;
        }
    }


    
    
    @PostMapping(value = "/requestRetraitConformite", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('User')")
    public Demande addNewDemandeRetraitHomologation(@RequestPart("demande") Demande request,
                                              @RequestPart("files") MultipartFile[] files,
                                              @RequestPart("equipements") Set<Equipement> equipements) {
        try {
            Long requestId = generateOrSetId(request);

            // Upload documents and create Document objects
            Set<Document> documents = uploadDocuments(files);

            // Set the documents and equipements on the demande object
            request.setDocuments(documents);
            request.setEquipement(equipements);

            // Save the demande with associated documents and equipements
            return demandeService.addNewDemandeRetraitConformite(request, documents, equipements,files);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    //DOWNLOAD_FILES
    @GetMapping("/{id}/downloadfiles/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Long id, @PathVariable String fileName, HttpServletResponse response) {
        try {
            byte[] fileBytes = demandeService.getFileBytes(id, fileName);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", fileName);

            ByteArrayResource resource = new ByteArrayResource(fileBytes);

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(fileBytes.length)
                    .body(resource);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }


  
    
    
    @PostMapping(value = "/requestConformite", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('User')")
    public Demande addNewDemandeConformite(@RequestPart("demande") Demande request,
                                              @RequestPart("files") MultipartFile[] files,
                                              @RequestPart("equipements") Set<Equipement> equipements) {
        try {
        	
            Long requestId = generateOrSetId(request);

            // Upload documents and create Document objects
            Set<Document> documents = uploadDocuments(files);

            // Set the documents and equipements on the demande object
            request.setDocuments(documents);
            request.setEquipement(equipements);

            // Save the demande with associated documents and equipements
            return demandeService.addNewDemandeConformite(request, documents, equipements,files);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    @GetMapping("/demandeCurrentUser")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<List<Demande>> getDemandeCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            List<Demande> demandes = demandeService.getDemandeForUser(username);
            return ResponseEntity.ok(demandes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/getAllDemands")
    @PreAuthorize("hasRole('Admin')")
    public List<Demande> getAllDemands() {
        return demandeService.getAllDemands();
    }
    
    
    
    
    @GetMapping("/{id}/demandeDetails")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Optional<Demande>> getDemadeDetailssAdmin(@PathVariable Long id) {
        try {
            Optional<Demande> demande = demandeService.getDemandeById(id);
            return ResponseEntity.ok(demande);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    
}
    
    
    
    @PostMapping(value = "/requestAdmissionTemporelle", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('User')")
    public Demande addNewDemandeAdmission(@RequestPart("demande") Demande request,
                                              @RequestPart("files") MultipartFile[] files,
                                              @RequestPart("equipements") Set<Equipement> equipements) {
        try {
            Long requestId = generateOrSetId(request);

            // Upload documents and create Document objects
            Set<Document> documents = uploadDocuments(files);

            // Set the documents and equipements on the demande object
            request.setDocuments(documents);
            request.setEquipement(equipements);

            // Save the demande with associated documents and equipements
            return demandeService.addNewDemandeAdmissionTemporelle(request, documents, equipements,files);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
    
    
    @PostMapping(value = "/requestContrôleRadiomMgnétique", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('User')")
    public Demande addNewDemandeContrôleRadiomMgnétique(@RequestPart("demande") Demande request,
                                              @RequestPart("files") MultipartFile[] files,
                                              @RequestPart("equipements") Set<Equipement> equipements) {
        try {
            Long requestId = generateOrSetId(request);

            // Upload documents and create Document objects
            Set<Document> documents = uploadDocuments(files);

            // Set the documents and equipements on the demande object
            request.setDocuments(documents);
            request.setEquipement(equipements);

            // Save the demande with associated documents and equipements
            return demandeService.addNewDemandeControlle(request, documents, equipements,files);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
    
    
    
    
    
    
   
    @DeleteMapping("/deleteDemande/{id}")
    @PreAuthorize("hasRole('Admin')")
    public void deleteDemandeById(@PathVariable("id") Long id) {
    	demandeService.deleteDemandeById(id);
    }
    private static final Logger logger = LoggerFactory.getLogger(DemandeController.class);

    
    @PutMapping("/{id}/changeStatus")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Demande> changeDemandStatus(@PathVariable Long id, @RequestParam StatutDemande newStatus) {
        try {
        	logger.info("Received request to change status for ID: {}", id);
            Demande updatedDemande = demandeService.updateDemandStatus(id, newStatus);
            return ResponseEntity.ok(updatedDemande);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
        	 logger.error("Error occurred while processing request:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    
    
    @PostMapping("/{id}/addDocuments")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<Demande> addDocumentsToDemand(@PathVariable Long id, @RequestParam("files") MultipartFile[] files) {
        try {
            // Call the service method to add documents to the demande
            Demande updatedDemande = demandeService.addDocumentsToDemand(id, files);
            return ResponseEntity.ok(updatedDemande);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    
    @GetMapping("/filterByStatus")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<List<Demande>> filterByStatus(@RequestParam StatutDemande status) {
        try {
            List<Demande> filteredDemands = demandeService.filterByStatus(status);
            return ResponseEntity.ok(filteredDemands);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/filterByType")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<List<Demande>> filterByType(@RequestParam TypeDemande type) {
        try {
            List<Demande> filteredDemands = demandeService.filterByType(type);
            return ResponseEntity.ok(filteredDemands);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }




    
    
    }
    
    
    
    
    
    
    



