package com.gaha.pfe.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gaha.pfe.entity.AvisTechnique;
import com.gaha.pfe.entity.AvisTechniqueStatus;
import com.gaha.pfe.entity.Document;
import com.gaha.pfe.service.AvisTechniqueService;


import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.ByteArrayResource;




@RestController
@RequestMapping("/avis-technique")
public class AvisTechniqueController {
	
	@Autowired
	 private  AvisTechniqueService avisTechniqueService;
	 

	   

	    @PostMapping(value={"/request"},consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
		@PreAuthorize("hasRole('User')")
	    public AvisTechnique addNewAvisTechnique(@RequestPart ("avisTechnique")AvisTechnique request,
	    										@RequestPart ("document")MultipartFile[] files) {
	    
	    
	    try{
	    	Set<Document> documents =uploadDocument(files);
	    	request.setAvisDocument(documents);
	    	return avisTechniqueService.addNewAvisTechnique(request);
	    }catch(Exception e){
	    	System.out.println(e.getMessage());
	    	return null;
	    }}
	    											   
	    	
	    												   
	    	
	    
	    
	    
	    public Set<Document> uploadDocument(MultipartFile[] multipartFiles) throws IOException {
	        Set<Document> documents = new HashSet<>();
	        for (MultipartFile file : multipartFiles) {
	            Document document = new Document(
	                file.getOriginalFilename(),
	                file.getContentType(),
	               
	                file.getBytes()
	            );
	            documents.add(document); // Adding the created Document instance to the set
	        }
	        return documents;
	    }

	    
	    
	    
	    @GetMapping("/all")
	    @PreAuthorize("hasRole('Admin')")
	    public ResponseEntity<List<AvisTechnique>> getAllAvisTechniques( @RequestParam (defaultValue="0") int pageNumber,
	    																 @RequestParam (defaultValue="") String searchKey) {
	        List<AvisTechnique> avisTechniques = avisTechniqueService.getAllAvisTechniques(pageNumber,searchKey);
	        return ResponseEntity.ok(avisTechniques);
	    }
	    
	    
	    @DeleteMapping("/delete/{id}")
	    @PreAuthorize("hasRole('Admin')")
	    public ResponseEntity<Void> deleteAvisTechnique(@PathVariable Long id) {
	        avisTechniqueService.deleteAvisTechnique(id);
	        return ResponseEntity.noContent().build();
	    }
	    
	    
	    @GetMapping("/{id}/admin")
	    @PreAuthorize("hasRole('Admin')")
	    public ResponseEntity<AvisTechnique> getAvisDetailsAdmin(@PathVariable Long id) {
	        try {
	            AvisTechnique avis = avisTechniqueService.getAvisById(id);
	            return ResponseEntity.ok(avis);
	        } catch (NoSuchElementException e) {
	            return ResponseEntity.notFound().build();
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	    
	}
	    
	    
	    
	    
	    
	    
	    @GetMapping("/{id}/user")
	    @PreAuthorize("hasRole('User')")
	    public ResponseEntity<AvisTechnique> getAvisDetailsUser(@PathVariable Long id) {
	        try {
	            AvisTechnique avis = avisTechniqueService.getAvisById(id);
	            return ResponseEntity.ok(avis);
	        } catch (NoSuchElementException e) {
	            return ResponseEntity.notFound().build();
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	    
	}
	    
	    @PostMapping("/{id}/response")
	    @PreAuthorize("hasRole('Admin')")
	    public ResponseEntity<String> submitResponse(@PathVariable Long id,
	                                                 @RequestParam("response") String response,
	                                                 @RequestParam("files") MultipartFile[] files) {
	        try {
	            // Update the repondu_le property with the current date and time
	            LocalDateTime reponduLe = LocalDateTime.now();
	            // Call your service method passing the ID, response, and files
	            avisTechniqueService.submitResponse(id, response, reponduLe, files);
	            return ResponseEntity.ok("Response submitted successfully for Avis with ID: " + id);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.notFound().build(); // Avis not found
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                                 .body("Error submitting response: " + e.getMessage());
	        }
	    }
	    
	    
	    
	    
	    @GetMapping("/{id}/downloadfiles/{fileName}")
	
	    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Long id, @PathVariable String fileName, HttpServletResponse response) {
	        try {
	            byte[] fileBytes = avisTechniqueService.getFileBytes(id, fileName);

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







	    
	    
	    @GetMapping("/reviews/{avisId}/status")
	    public ResponseEntity<AvisTechniqueStatus> getAvisTechniqueStatus(@PathVariable Long avisId) {
	        try {
	            AvisTechniqueStatus status = avisTechniqueService.getReviewStatus(avisId);
	            return ResponseEntity.ok(status);
	        } catch (NoSuchElementException e) {
	            return ResponseEntity.notFound().build();
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	    }
	    
	    @GetMapping("/user")
	    @PreAuthorize("hasRole('User')")
	    public ResponseEntity<List<AvisTechnique>> getAvisTechniquesForCurrentUser() {
	        try {
	            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	            String username = authentication.getName();
	            List<AvisTechnique> avisTechniques = avisTechniqueService.getAvisTechniquesForUser(username);
	            return ResponseEntity.ok(avisTechniques);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	    
	    
	  


	}
	    
	    
	    
	    
	    
	    
	    
	    
	    










