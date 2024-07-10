package com.gaha.pfe.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.gaha.pfe.dao.DemandeDao;
import com.gaha.pfe.dao.DocumentDao;
import com.gaha.pfe.dao.EquipementDao;
import com.gaha.pfe.dao.UserDao;
import com.gaha.pfe.entity.AvisTechnique;
import com.gaha.pfe.entity.AvisTechniqueStatus;
import com.gaha.pfe.entity.Demande;
import com.gaha.pfe.entity.Document;
import com.gaha.pfe.entity.Equipement;
import com.gaha.pfe.entity.StatutDemande;
import com.gaha.pfe.entity.TypeDemande;
import com.gaha.pfe.entity.User;

@Service
public class DemandeService {

    @Autowired
    private DemandeDao demandeRepo;

    @Autowired
    private DocumentDao documentRepo;

    @Autowired
    private EquipementDao equipementRepo; 
    @Autowired
    private NotificationService notificationService;


    
    

    private static final String UPLOAD_DIR_Homologation = "C:\\Users\\Aziz\\Desktop\\Mes Stage\\Pfe_3eme\\Application2\\LesDemandes\\Homologation";
    
    private static final String UPLOAD_DIR_Conformite = "C:\\Users\\Aziz\\Desktop\\Mes Stage\\Pfe_3eme\\Application2\\LesDemandes\\Conformité";
    
    private static final String UPLOAD_DIR_Conformite_Admission = "C:\\Users\\Aziz\\Desktop\\Mes Stage\\Pfe_3eme\\Application2\\LesDemandes\\Conformité\\AdmissionTemporelle";

    private static final String UPLOAD_DIR_Conformite_Controle = "C:\\Users\\Aziz\\Desktop\\Mes Stage\\Pfe_3eme\\Application2\\LesDemandes\\Conformité\\ContrôleRadioMgnétique";

    private static final String UPLOAD_DIR_RetraitConformite = "C:\\Users\\Aziz\\Desktop\\Mes Stage\\Pfe_3eme\\Application2\\LesDemandes\\RetraitPourLaConformité";

    
    public Demande updateDemandStatus(Long demandId, StatutDemande newStatus) {
        Optional<Demande> optionalDemande = demandeRepo.findById(demandId);
        if (optionalDemande.isPresent()) {
            Demande demande = optionalDemande.get();
            demande.setStatus(newStatus);
            String userEmail = demande.getUser().getEmail();
            System.out.println("User Email: " + userEmail); // Log user email
            sendNotificationToUserForResponse(userEmail, demandId);
            return demandeRepo.save(demande);
        } else {
            throw new NoSuchElementException("Demand not found with ID: " + demandId);
        }
    }

    private void sendNotificationToUserForResponse(String userEmail, Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        System.out.println("Authenticated User: " + username); // Log authenticated user

        Demande demande = demandeRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Demande not found"));
        System.out.println("Demande Status: " + demande.getStatus()); // Log demande status

        // Build the HTML styled message
        String notificationMessage = "<p>Good Evening,</p>" +
                "<p>We're reaching out to inform you about the status of your request. Here are the details:</p>" +
                "<p>Request ID: " + id + "</p>" +
                "<p>Status: " + demande.getStatus() + "</p>" +
                "<p>If your request status is \"ComplementExpectations,\" it means that additional files are required. " +
                "Please log in to your account and upload the necessary files as soon as possible. " +
                "Failure to do so may result in delays in processing your request.</p>" +
                "<p>Thank you for your attention to this matter.</p>" +
                "<p>Best regards,</p>" +
                "<p>" + username + "</p>";
        System.out.println("Notification Message: " + notificationMessage); // Log notification message

        // Send the notification email
        notificationService.sendNotification(userEmail, notificationMessage, id);
        System.out.println("Notification sent successfully.");
    }

    @Transactional
    public Demande addNewDemandeHomologation(Demande request, Set<Document> documents, Set<Equipement> equipements, MultipartFile[] files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        User user = new User();
        user.setUserName(username);
        request.setUser(user);

        try {
            // Create directory for the demand if it does not exist
            String demandFolder = UPLOAD_DIR_Homologation + File.separator + request.getId();
            File dir = new File(demandFolder);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Process each file
            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                Path filePath = Paths.get(demandFolder, fileName);
                Files.copy(file.getInputStream(), filePath);

                Document document = new Document();
                document.setNom_Document(fileName);
                document.setDesc_Document(""); // Assuming you have a description field, modify as needed
                document.setFilePath(filePath.toString());
                document.setData(file.getBytes());
                documents.add(document);
            }

            // Set the type of request
            request.setTypeDemande(TypeDemande.Homologation);
            request.setStatus(StatutDemande.onGoing);


            // Save each document
            for (Document document : documents) {
                documentRepo.save(document);
            }

            // Save each equipement
            for (Equipement equipement : equipements) {
                equipementRepo.save(equipement);
            }

            // Set the saved documents and equipements on the demande object
            request.setDocuments(documents);
            request.setEquipement(equipements);

            // Save the demande with associated documents and equipements
            return demandeRepo.save(request);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle error appropriately
            return null;
        }
    }
    
    
    
    @Transactional
    public Demande addNewDemandeRetraitConformite(Demande request, Set<Document> documents, Set<Equipement> equipements,MultipartFile[] files) {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = new User();
        user.setUserName(username);
        request.setUser(user);
        
        
        try {
            // Create directory for the demand if it does not exist
            String demandFolder = UPLOAD_DIR_RetraitConformite + File.separator + request.getId();
            File dir = new File(demandFolder);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Process each file
            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                Path filePath = Paths.get(demandFolder, fileName);
                Files.copy(file.getInputStream(), filePath);

                Document document = new Document();
                document.setNom_Document(fileName);
                document.setDesc_Document(""); // Assuming you have a description field, modify as needed
                document.setFilePath(filePath.toString());
                document.setData(file.getBytes());
                documents.add(document);
            }
    	
    	// Set the type of request
        request.setTypeDemande(TypeDemande.RetraitDeLaConformité);
        request.setStatus(StatutDemande.onGoing);

        // Save each document
        for (Document document : documents) {
            documentRepo.save(document);
        }

        // Save each equipement
        for (Equipement equipement : equipements) {
            equipementRepo.save(equipement);
        }

        // Set the saved documents and equipements on the demande object
        request.setDocuments(documents);
        request.setEquipement(equipements);

        // Save the demande with associated documents and equipements
        return demandeRepo.save(request);}
        catch (IOException e) {
            e.printStackTrace();
            // Handle error appropriately
            return null;
        }
    }
    
    
    
    @Transactional
    public Demande addNewDemandeConformite(Demande request, Set<Document> documents, Set<Equipement> equipements, MultipartFile[] files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        User user = new User();
        user.setUserName(username);
        request.setUser(user);

        try {
            // Set the type of request
            request.setTypeDemande(TypeDemande.Conformité);
            request.setStatus(StatutDemande.onGoing);

            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                String demandFolder = UPLOAD_DIR_Conformite + File.separator + request.getId();
                File dir = new File(demandFolder);
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                Path filePath = Paths.get(demandFolder, fileName);
                Files.copy(file.getInputStream(), filePath);

                Document document = new Document();
                document.setNom_Document(fileName);
                document.setDesc_Document(""); // Assuming you have a description field, modify as needed
                document.setFilePath(filePath.toString());
                document.setData(file.getBytes());
                documents.add(document);

                // Save each document
                documentRepo.save(document);
            }

            // Save each equipment
            for (Equipement equipement : equipements) {
                equipementRepo.save(equipement);
            }

            // Set the saved documents and equipment on the demande object
            request.setDocuments(documents);
            request.setEquipement(equipements);

            // Save the demande with associated documents and equipment
            return demandeRepo.save(request);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle error appropriately
            return null;
        }
    }
    
    public Demande addNewDemandeAdmissionTemporelle(Demande request, Set<Document> documents, Set<Equipement> equipements, MultipartFile[] files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        User user = new User();
        user.setUserName(username);
        request.setUser(user);

        try {
            // Create directory for the demand if it does not exist
            String demandFolder = UPLOAD_DIR_Conformite_Admission + File.separator + request.getId();
            File dir = new File(demandFolder);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Process each file
            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                Path filePath = Paths.get(demandFolder, fileName);
                Files.copy(file.getInputStream(), filePath);

                Document document = new Document();
                document.setNom_Document(fileName);
                document.setDesc_Document(""); // Assuming you have a description field, modify as needed
                document.setFilePath(filePath.toString());
                document.setData(file.getBytes());
                documents.add(document);
            }

            // Set the type of request
            request.setTypeDemande(TypeDemande.AdmissionTemporelle);
            request.setStatus(StatutDemande.onGoing);


            // Save each document
            for (Document document : documents) {
                documentRepo.save(document);
            }

            // Save each equipement
            for (Equipement equipement : equipements) {
                equipementRepo.save(equipement);
            }

            // Set the saved documents and equipements on the demande object
            request.setDocuments(documents);
            request.setEquipement(equipements);

            // Save the demande with associated documents and equipements
            return demandeRepo.save(request);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle error appropriately
            return null;
        }
    }
    
    
    
    public Demande addNewDemandeControlle(Demande request, Set<Document> documents, Set<Equipement> equipements, MultipartFile[] files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        User user = new User();
        user.setUserName(username);
        request.setUser(user);

        try {
            // Create directory for the demand if it does not exist
            String demandFolder = UPLOAD_DIR_Conformite_Controle + File.separator + request.getId();
            File dir = new File(demandFolder);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Process each file
            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                Path filePath = Paths.get(demandFolder, fileName);
                Files.copy(file.getInputStream(), filePath);

                Document document = new Document();
                document.setNom_Document(fileName);
                document.setDesc_Document(""); // Assuming you have a description field, modify as needed
                document.setFilePath(filePath.toString());
                document.setData(file.getBytes());
                documents.add(document);
            }

            // Set the type of request
            request.setTypeDemande(TypeDemande.ContrôleRadiomMgnétique);
            request.setStatus(StatutDemande.onGoing);


            // Save each document
            for (Document document : documents) {
                documentRepo.save(document);
            }

            // Save each equipement
            for (Equipement equipement : equipements) {
                equipementRepo.save(equipement);
            }

            // Set the saved documents and equipements on the demande object
            request.setDocuments(documents);
            request.setEquipement(equipements);

            // Save the demande with associated documents and equipements
            return demandeRepo.save(request);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle error appropriately
            return null;
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    



	 public List<Demande> getDemandeForUser(String username) {
	        return demandeRepo.findByUser_UserName(username);
	    }
	 
	 public List<Demande> getAllDemands() {
	        return (List<Demande>) demandeRepo.findAll();
	    }
	 public Optional<Demande> getDemandeById(Long id) {
		 return demandeRepo.findById(id);
	 }
	 
	 public void deleteDemandeById(Long id) {
		  demandeRepo.deleteById(id);
	 }
	 
	
	 
	 public byte[] getFileBytes(Long demandeID, String fileName) throws IOException {
	        Demande demande = demandeRepo.findById(demandeID).orElseThrow(NoSuchElementException::new);
	        Set<Document> documents = demande.getDocuments();
	
	        for (Document document : documents) {
	            if (document.getNom_Document().equals(fileName)) {
	                return document.getData();
	            }
	        }
	
	        throw new NoSuchElementException("File not found with name: " + fileName);
	    }
	 
	 
	

	 
	 @Transactional
	 public Demande addDocumentsToDemand(Long demandId, MultipartFile[] files) {
	     // Retrieve the demande from the database
	     Optional<Demande> optionalDemande = demandeRepo.findById(demandId);
	     if (optionalDemande.isPresent()) {
	         Demande demande = optionalDemande.get();

	         // Check if the demande status is complementExpectation
	         if (demande.getStatus() == StatutDemande.complementExpectation) {
	             try {
	                 // Process each file and add it as a new document to the demande
	                 for (MultipartFile file : files) {
	                     String fileName = file.getOriginalFilename();
	                     String demandFolder = ""; // Set the demand folder path as needed
	                     File dir = new File(demandFolder);
	                     if (!dir.exists()) {
	                         dir.mkdirs();
	                     }

	                     Path filePath = Paths.get(demandFolder, fileName);
	                     Files.copy(file.getInputStream(), filePath);

	                     Document document = new Document();
	                     document.setNom_Document(fileName);
	                     document.setDesc_Document(""); // Assuming you have a description field, modify as needed
	                     document.setFilePath(filePath.toString());
	                     document.setData(file.getBytes());
	                     demande.getDocuments().add(document);
	                 }
	                 demande.setStatus(StatutDemande.onGoing);


	                 // Save the updated demande with the new documents
	                 return demandeRepo.save(demande);
	             } catch (IOException e) {
	                 e.printStackTrace();
	                 // Handle error appropriately
	                 throw new RuntimeException("Error adding documents to demande: " + e.getMessage());
	             }
	         } else {
	             throw new IllegalStateException("Cannot add documents to demande. Status is not complementExpectation.");
	         }
	     } else {
	         throw new NoSuchElementException("Demande not found with ID: " + demandId);
	     }
	 }
	 
	 
	 
	 public List<Demande> filterByStatus(StatutDemande status) {
	        return demandeRepo.findByStatus(status);
	    }

	    public List<Demande> filterByType(TypeDemande type) {
	        return demandeRepo.findByTypeDemande(type);
	    }



	 
	 
	
	 

	 
	 
}
