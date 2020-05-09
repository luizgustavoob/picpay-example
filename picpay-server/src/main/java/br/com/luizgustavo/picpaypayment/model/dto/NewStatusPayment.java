package br.com.luizgustavo.picpaypayment.model.dto;

import org.json.JSONObject;

import lombok.Data;

@Data
public class NewStatusPayment {

	private String referenceId;
	private String status;
	
	public NewStatusPayment(String jsonStr) {
		JSONObject json = new JSONObject(jsonStr);
		this.referenceId = json.getString("referenceId");
		this.status = json.getString("status");
	}
}
