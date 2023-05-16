package br.com.luizgustavo.picpaypayment.model.dto;

import org.json.JSONObject;

public class PaymentGenerated {
	
	private String referenceId;
	private String expiresAt;
	private String qrCode;
	private String statusPayment;

	public PaymentGenerated(String jsonStr) {
		JSONObject json = new JSONObject(jsonStr);
		this.referenceId = json.getString("referenceId");
		this.expiresAt = json.getString("expiresAt");
		this.qrCode = json.getJSONObject("qrcode").getString("base64");
		this.statusPayment = "Pagamento Pendente";		
	}

	public String getReferenceId() {
		return referenceId;
	}

	public void setReferenceId(String referenceId) {
		this.referenceId = referenceId;
	}

	public String getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(String expiresAt) {
		this.expiresAt = expiresAt;
	}

	public String getQrCode() {
		return qrCode;
	}

	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
	}

	public String getStatusPayment() {
		return statusPayment;
	}

	public void setStatusPayment(String statusPayment) {
		this.statusPayment = statusPayment;
	}
}
