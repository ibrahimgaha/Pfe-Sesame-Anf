	package com.gaha.pfe.service;
	
	import java.io.IOException;
	import java.text.SimpleDateFormat;
	import java.time.LocalDateTime;
	import java.util.ArrayList;
	import java.util.Collection;
	import java.util.Date;
	import java.util.HashSet;
	import java.util.List;
	import java.util.NoSuchElementException;
	import java.util.Optional;
	import java.util.Set;
	
	import org.springframework.data.domain.PageRequest;
	import org.springframework.data.domain.Pageable;
	
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	import org.springframework.web.multipart.MultipartFile;
	import org.springframework.security.core.Authentication;
	import org.springframework.security.core.GrantedAuthority;
	import org.springframework.security.core.context.SecurityContextHolder;
	import java.util.zip.ZipEntry;
	import java.util.zip.ZipOutputStream;
	import java.io.ByteArrayOutputStream;
	
	import com.gaha.pfe.dao.AvisTechniqueDao;
	import com.gaha.pfe.entity.AvisTechnique;
	import com.gaha.pfe.entity.AvisTechniqueStatus;
	import com.gaha.pfe.entity.Document;
	import com.gaha.pfe.entity.User;
	
	
	
	
	
	@Service
	public class AvisTechniqueService {
	    
	    @Autowired
	    private AvisTechniqueDao avisRepo;
	    
	    @Autowired
	    private DocumentService documentService;
	    
	    @Autowired
	    private NotificationService notificationService;
	    
	    public AvisTechniqueService(AvisTechniqueDao avisRepo, DocumentService documentService) {
	        this.avisRepo = avisRepo;
	        this.documentService = documentService;
	    }
	    
	
	    public AvisTechnique addNewAvisTechnique(AvisTechnique request) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
	        boolean isAdmin = authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_Admin"));
	        String username = authentication.getName();
	        User user = new User();
	        user.setUserName(username);
	        request.setUser(user);
	
	        
	        
	
	        request.setAvisTechniqueStatus(AvisTechniqueStatus.Pas_Repondu);
	       
	        if (!(request.getResponse() == null || request.getResponse().isEmpty())) {
	             request.setAvisTechniqueStatus(AvisTechniqueStatus.Repondu);
	        } 
	
	        return avisRepo.save(request);
	    }
	
	
	    
	    
	    public List<AvisTechnique> getAllAvisTechniques(int pageNumber,String searchKey) {
	    	Pageable pageable = PageRequest.of(pageNumber,4);
	    	
	    	if (searchKey.equals("")) {
	            return (List<AvisTechnique>) avisRepo.findAll(pageable);
	
	    	}
	    	else {
	    		return avisRepo.findByNomEquipementContainingIgnoreCaseOrQuestionContainingIgnoreCaseOrSelectedAvisTechniqueContainingIgnoreCase
	    		( searchKey,searchKey,searchKey, pageable);
	    	}
	    	
	    }
	    
	    
	    
	    
	    
	    
	    public void deleteAvisTechnique(Long id) {
	        avisRepo.deleteById(id);
	    }
	    
	    public AvisTechnique getAvisById(Long id) {
	        return avisRepo.findById(id).orElseThrow(NoSuchElementException::new);
	    }
	    
	    public void submitResponse(Long id, String response, LocalDateTime reponduLe, MultipartFile[] files) {
	        AvisTechnique avis = avisRepo.findById(id)
	                .orElseThrow(() -> new IllegalArgumentException("Avis not found"));
	
	        avis.setResponse(response);
	        avis.setRepondu_le(reponduLe.toString());
	        avis.setAvisTechniqueStatus(AvisTechniqueStatus.Repondu);
	
	        avisRepo.save(avis);
	
	        try {
	            Set<Document> existingDocuments = avis.getAvisDocument(); // Get existing documents
	            Set<Document> adminDocuments = uploadDocument(files); // Upload admin documents
	
	            // Merge admin documents with existing documents
	            existingDocuments.addAll(adminDocuments);
	
	            // Update AvisTechnique with merged documents
	            avis.setAvisDocument(existingDocuments);
	            avisRepo.save(avis);
	        } catch (IOException e) {
	            throw new RuntimeException("Failed to upload documents: " + e.getMessage());
	        }
	
	        
	        
	
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	
	     // Check if the authentication object is not null and if the user is authenticated
	     if (authentication != null && authentication.isAuthenticated()) {
	         // Get the authorities (roles) associated with the authenticated user
	         Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
	
	         // Print out the authorities (roles)
	         for (GrantedAuthority authority : authorities) {
	             System.out.println("Role: " + authority.getAuthority());
	         }
	     } else {
	         System.out.println("User is not authenticated");
	     }
	     
	     
	        sendNotificationToUser(avis.getUser().getEmail(),avis.getId());
	    }
	    
	    
	    
	    public byte[] getFileBytes(Long avisId, String fileName) throws IOException {
	        AvisTechnique avis = avisRepo.findById(avisId).orElseThrow(NoSuchElementException::new);
	        Set<Document> documents = avis.getAvisDocument();
	
	        for (Document document : documents) {
	            if (document.getNom_Document().equals(fileName)) {
	                return document.getData();
	            }
	        }
	
	        throw new NoSuchElementException("File not found with name: " + fileName);
	    }
	
	
	    
	    
	    
	    
	    
	    
	    private Set<Document> uploadDocument(MultipartFile[] multipartFiles) throws IOException {
	        Set<Document> documents = new HashSet<>();
	        for (MultipartFile file : multipartFiles) {
	            Document document = new Document(
	                file.getOriginalFilename(),
	                file.getContentType(),
	                
	                file.getBytes()
	            );
	            documents.add(document);
	        }
	        return documents;
	    }
	
	    
	    private void sendNotificationToUser(String userEmail,Long id ) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String username = authentication.getName();
	        
	        AvisTechnique avis = avisRepo.findById(id)
	                .orElseThrow(() -> new IllegalArgumentException("Avis not found"));
	
	      String question=   avis.getQuestion();
	
	        // Define your HTML styled message
	      String notificationMessage = "<p style='color: blue; font-size: 16px;'>Hello,</p>" +
                  "<p style='color: black; font-size: 18px;'>Your technical review about <span style='color: black; font-size: 18px;font-weight:bold'>" + question + "</span> is treated.</p>" +
                  "<p style='color: red; font-size: 14px; '>Best regards, " + username.toUpperCase() + "</p>";

	        notificationService.sendNotification(userEmail, notificationMessage,id);
	        System.out.println("Notification sent successfully.");
	    }
	
	    
	    public Set<Document> getFilesByAvisId(Long avisId) {
	        AvisTechnique avis = avisRepo.findById(avisId).orElseThrow(NoSuchElementException::new);
	        return avis.getAvisDocument();
	    }
	    
	    public List<AvisTechnique> getAvisTechniquesForUser(String username) {
	        return avisRepo.findByUser_UserName(username);
	    }
	    
	    public AvisTechniqueStatus getReviewStatus(Long avisId) {
	        AvisTechnique avis = avisRepo.findById(avisId).orElse(null);
	        if (avis != null) {
	            if (avis.getResponse() == null || avis.getResponse().isEmpty()) {
	                return AvisTechniqueStatus.Pas_Repondu;
	            } else {
	                return AvisTechniqueStatus.Repondu;
	            }
	        } else {
	            throw new NoSuchElementException("Avis not found with ID: " + avisId);
	        }
	    }
	    
	    
	    
	   
	}
