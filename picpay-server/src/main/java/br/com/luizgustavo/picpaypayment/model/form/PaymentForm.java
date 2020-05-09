package br.com.luizgustavo.picpaypayment.model.form;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import br.com.luizgustavo.picpaypayment.model.Buyer;
import br.com.luizgustavo.picpaypayment.model.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
