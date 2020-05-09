package br.com.luizgustavo.picpaypayment.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Buyer {

	private String firstName;
	private String lastName;
	private String document;
	private String email;
	private String phone;
}
