package br.com.luizgustavo.picpaypayment.model.dto;

import org.json.JSONObject;

public class NewStatusPayment {

	private String referenceId;
	private String status;
	
	public NewStatusPayment(String jsonStr) {
		JSONObject json = new JSONObject(jsonStr);
		this.referenceId = json.getString("referenceId");
		this.status = json.getString("status");
	}

	public String getReferenceId() {
		return referenceId;
	}

	public void setReferenceId(String referenceId) {
		this.referenceId = referenceId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
