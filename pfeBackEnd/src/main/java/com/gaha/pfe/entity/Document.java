package com.gaha.pfe.entity;

import java.util.Date;
import java.util.HashSet;

import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Document {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nomDocument;
    private String descDocument;
    private String filePath;

    

    @Column(length = 1000000000) // Increase the length as needed
    private byte[] data;
    
    @ManyToMany(mappedBy = "documents")
    @JsonIgnore
    private Set<Demande> demandes = new HashSet<>();


	

	public Document(String nom_Document, String desc_Document, byte[] data) {
	    this.nomDocument = nom_Document;
	    this.descDocument = desc_Document;
	    this.data = data;
	}
	


	public Document() {
		
	}
	
	



	public String getFilePath() {
		return filePath;
	}



	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom_Document() {
		return nomDocument;
	}

	public void setNom_Document(String nom_Document) {
		this.nomDocument = nom_Document;
	}

	public String getDesc_Document() {
		return descDocument;
	}

	public void setDesc_Document(String descDocument) {
		this.descDocument = descDocument;
	}

	

	
	public byte[] getData() {
		return data;
	}

	
	public void setData(byte[] data) {
		this.data = data;
	}


	public Set<Demande> getDemandes() {
		return demandes;
	}

	public void setDemandes(List<Demande> demandes) {
		this.demandes = (Set<Demande>) demandes;
	}

	

	
	
	
	
	
	
	
	
	
}
