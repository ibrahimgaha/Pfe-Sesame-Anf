	package com.gaha.pfe.entity;
	
	import java.util.ArrayList;
import java.util.Date;
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gaha.pfe.entity.User;

	
	
	@Entity
	public class Demande {
	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Long id;

	    private String envoyeLe;
	    private String datePremierCompliment;
	    private String dateDeuxiemeCompliment;
	    
	    @Enumerated(EnumType.STRING)
	    private TypeDemande typeDemande;
	    
	    @Enumerated(EnumType.STRING)
	    private StatutDemande status ;
	    
		
	    
	    
	    
	    @ManyToMany(fetch = FetchType.EAGER,cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	    @JoinTable(name = "demandeDocument", joinColumns = { @JoinColumn(name = "demande_id") }, inverseJoinColumns = {
	            @JoinColumn(name = "document") })
	    private Set<Document> documents;
	    
	    
	    @ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	    @JoinTable(name = "demandeEquipement",
	            joinColumns = @JoinColumn(name = "Demande_Id"),
	            inverseJoinColumns = @JoinColumn(name = "Equipement_Id"))
	    private Set<Equipement> equipement;

	    
	   


	    @ManyToOne
	    private User user;
	    

	
		public StatutDemande getStatus() {
			return status;
		}


		public void setStatus(StatutDemande status) {
			this.status = status;
		}
		
		
	


		public Set<Document> getDocuments() {
			return documents;
		}


		public void setDocuments(Set<Document> documents) {
			this.documents = documents;
		}


		public User getUser() {
			return user;
		}


		public void setUser(User user) {
			this.user = user;
		}


		public String getDatePremierCompliment() {
			return datePremierCompliment;
		}


		public void setDatePremierCompliment(String datePremierCompliment) {
			this.datePremierCompliment = datePremierCompliment;
		}


		public String getDateDeuxiemeCompliment() {
			return dateDeuxiemeCompliment;
		}


		public void setDateDeuxiemeCompliment(String dateDeuxiemeCompliment) {
			this.dateDeuxiemeCompliment = dateDeuxiemeCompliment;
		}

	
	
		

		public Long getId() {
			return id;
		}
		
		public void setId(Long id) {
			this.id = id;
		}
		
		
		
		
		
		public String getenvoyeLe() {
			return envoyeLe;
		}
		
		public void setenvoyeLe(String envoyeLe) {
			this.envoyeLe = envoyeLe;
		}
		
		public TypeDemande getTypeDemande() {
			return typeDemande;
		}
		
		public void setTypeDemande(TypeDemande typeDemande) {
			this.typeDemande = typeDemande;
		}


		public Set<Equipement> getEquipement() {
			return equipement;
		}


		public void setEquipement(Set<Equipement> equipement) {
			this.equipement = equipement;
		}
		
		
		
		
		
		
		
	}
