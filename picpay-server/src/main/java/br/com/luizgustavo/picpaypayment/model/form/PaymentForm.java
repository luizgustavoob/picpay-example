package br.com.luizgustavo.picpaypayment.model.form;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import br.com.luizgustavo.picpaypayment.model.Buyer;
import br.com.luizgustavo.picpaypayment.model.Payment;

public class PaymentForm {

	@NotNull @NotEmpty @NotBlank
	private String referenceId;
	@NotNull 
	private Double value;
	@NotNull @NotEmpty @NotBlank
	private String firstName;
	@NotNull @NotEmpty @NotBlank
	private String lastName;
	@NotNull @NotEmpty @NotBlank
	private String document;
	@NotNull @NotEmpty @NotBlank @Email
	private String email;
	@NotNull @NotEmpty @NotBlank
	private String phone;

	public PaymentForm() {
		super();
	}

	public PaymentForm(String referenceId, Double value, String firstName, String lastName,
		String document, String email, String phone) {
		super();
		this.referenceId = referenceId;
		this.value = value;
		this.firstName = firstName;
		this.lastName = lastName;
		this.document = document;
		this.email = email;
		this.phone = phone;
	}	
	
	public Payment toPayment(String callbackUrl, String returnUrl, Integer minutesForExpiration) {
		Payment payment = new Payment(minutesForExpiration);
		
		payment.setReferenceId(referenceId);
		payment.setCallbackUrl(callbackUrl);
		payment.setReturnUrl(returnUrl);
		payment.setValue(value);
		
		Buyer buyer = new Buyer();
		buyer.setFirstName(firstName);
		buyer.setLastName(lastName);
		buyer.setDocument(document);
		buyer.setEmail(email);
		buyer.setPhone(phone);
		payment.setBuyer(buyer);
		
		return payment;
	}
	
}
