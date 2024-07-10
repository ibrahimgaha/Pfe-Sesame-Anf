package com.gaha.pfe.entity;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class AvisTechnique {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nomEquipement;
    private String question;
    private String selectedAvisTechnique;
    private String envoye_Le;
    private String repondu_le;
    private String response;
    @Enumerated(EnumType.STRING)
    private AvisTechniqueStatus avisTechniqueStatus;
    
    

    @ManyToOne
    private User user;
    
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "avisDocuments", joinColumns = { @JoinColumn(name = "avis_id") }, inverseJoinColumns = {
            @JoinColumn(name = "document") })
    private Set<Document> avisDocument;
    
    
    
    
    
    

	public AvisTechnique() {
		
	}

	public AvisTechnique(String nomEquipement, String question, String selectedAvisTechnique, String envoye_Le,
			String repondu_le, String response, AvisTechniqueStatus avisTechniqueStatus, 
			User user, Set<Document> avisDocument) {
		super();
		this.nomEquipement = nomEquipement;
		this.question = question;
		this.selectedAvisTechnique = selectedAvisTechnique;
		this.envoye_Le = envoye_Le;
		this.repondu_le = repondu_le;
		this.response = response;
		this.avisTechniqueStatus = avisTechniqueStatus;
		this.user = user;
		this.avisDocument = avisDocument;
	}
	
	
	

	@Override
	public String toString() {
		return "AvisTechnique [id=" + id + ", nomEquipement=" + nomEquipement + ", question=" + question
				+ ", selectedAvisTechnique=" + selectedAvisTechnique + ", envoye_Le=" + envoye_Le + ", repondu_le="
				+ repondu_le + ", response=" + response + ", avisTechniqueStatus=" + avisTechniqueStatus
				 + ", user=" + user + ", avisDocument=" + avisDocument + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomEquipement() {
		return nomEquipement;
	}

	public void setNomEquipement(String nomEquipement) {
		this.nomEquipement = nomEquipement;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getSelectedAvisTechnique() {
		return selectedAvisTechnique;
	}

	public void setSelectedAvisTechnique(String selectedAvisTechnique) {
		this.selectedAvisTechnique = selectedAvisTechnique;
	}

	public String getEnvoye_Le() {
		return envoye_Le;
	}

	public void setEnvoye_Le(String envoye_Le) {
		this.envoye_Le = envoye_Le;
	}

	public String getRepondu_le() {
		return repondu_le;
	}

	public void setRepondu_le(String repondu_le) {
		this.repondu_le = repondu_le;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public AvisTechniqueStatus getAvisTechniqueStatus() {
		return avisTechniqueStatus;
	}

	public void setAvisTechniqueStatus(AvisTechniqueStatus avisTechniqueStatus) {
		this.avisTechniqueStatus = avisTechniqueStatus;
	}


	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Document> getAvisDocument() {
		return avisDocument;
	}

	public void setAvisDocument(Set<Document> avisDocument) {
		this.avisDocument = avisDocument;
	}
    
    
    
    
	   
	   
}
