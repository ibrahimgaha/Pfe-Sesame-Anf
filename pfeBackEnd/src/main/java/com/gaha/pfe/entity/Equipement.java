package com.gaha.pfe.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Equipement {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
		  private Long id;
		  private String modele;
		  private String marque;
		  private int quantite; // Ensure quantite is defined as an integer
		 
		  private String type;

		 
		

	
	
	@ManyToMany(mappedBy = "equipement")
	@JsonIgnore
	private List<Demande> demande;

	
	
	
	public Equipement() {
		
	}
	
	

	

	





	public Equipement(Long id, String modele, String marque, int quantite, String type, List<Demande> demande) {
		super();
		this.id = id;
		this.modele = modele;
		this.marque = marque;
		this.quantite = quantite;
		this.type = type;
		this.demande = demande;
	}











	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	

	
	
	
	
	
	
	



	public String getType() {
		return type;
	}





	public void setType(String type) {
		type = type;
	}





	public String getModele() {
		return modele;
	}



	public void setModele(String modele) {
		this.modele = modele;
	}



	public String getMarque() {
		return marque;
	}



	public void setMarque(String marque) {
		this.marque = marque;
	}



	public Integer getQuantite() {
		return quantite;
	}



	public void setQuantite(Integer quantite) {
		this.quantite = quantite;
	}



	public List<Demande> getDemande() {
		return demande;
	}



	public void setDemande(List<Demande> demande) {
		this.demande = demande;
	}
	
	
	



}
