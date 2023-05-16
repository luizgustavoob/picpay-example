package br.com.luizgustavo.picpaypayment.model;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class Payment {

	private String referenceId;
	private String callbackUrl;
	private String returnUrl;
	private String expiresAt;	
	private Double value;
	private Buyer buyer;
	
	public Payment(Integer minutesForExpiration) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ");
		this.expiresAt = ZonedDateTime.now().plusMinutes(minutesForExpiration).format(formatter);
	}
	
	public String getReferenceId() {
		return referenceId;
	}

	public void setReferenceId(String referenceId) {
		this.referenceId = referenceId;
	}

	public String getCallbackUrl() {
		return callbackUrl;
	}

	public void setCallbackUrl(String callbackUrl) {
		this.callbackUrl = callbackUrl;
	}

	public String getReturnUrl() {
		return returnUrl;
	}

	public void setReturnUrl(String returnUrl) {
		this.returnUrl = returnUrl;
	}

	public String getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(String expiresAt) {
		this.expiresAt = expiresAt;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	public Buyer getBuyer() {
		return buyer;
	}

	public void setBuyer(Buyer buyer) {
		this.buyer = buyer;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		
		builder.append(this.referenceId + "\n");
		builder.append(this.callbackUrl + "\n");
		builder.append(this.returnUrl + "\n");
		builder.append(this.expiresAt + "\n");
		builder.append(this.value + "\n");
		
		builder.append(this.buyer.getFirstName() + "\n");
		builder.append(this.buyer.getLastName() + "\n");
		builder.append(this.buyer.getDocument() + "\n");
		builder.append(this.buyer.getPhone() + "\n");
		builder.append(this.buyer.getEmail() + "\n");
		
		return builder.toString();
	}
}
