package br.com.luizgustavo.picpaypayment.model.form;

public class StatusChangeForm {

	private String referenceId;
	private String authorizationId;
	
	public StatusChangeForm() {
		super();
	}
	
	public StatusChangeForm(String referenceId, String authorizationId) {
		super();
		this.referenceId = referenceId;
		this.authorizationId = authorizationId;
	}
	
	public String getReferenceId() {
		return this.referenceId;
	}
	
	public void setReferenceId(String referenceId) {
		this.referenceId = referenceId;
	}
	
	public String getAuthorizationId() {
		return this.authorizationId;
	}
	
	public void setAuthorizationId(String authorizationId) {
		this.authorizationId = authorizationId;
	}	
}
