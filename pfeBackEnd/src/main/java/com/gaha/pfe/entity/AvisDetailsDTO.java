package com.gaha.pfe.entity;

import java.util.Set;

public class AvisDetailsDTO {
	private AvisTechnique avis;
    private Set<Document> files;
    
    
    
	public AvisTechnique getAvis() {
		return avis;
	}
	public void setAvis(AvisTechnique avis) {
		this.avis = avis;
	}
	public Set<Document> getFiles() {
		return files;
	}
	public void setFiles(Set<Document> files) {
		this.files = files;
	}
    
    
}
