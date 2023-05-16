package br.com.luizgustavo.picpaypayment.model;

public class Buyer {

	private String firstName;
	private String lastName;
	private String document;
	private String email;
	private String phone;
	
	public Buyer() {
		super();
	}

	public Buyer(String firstName, String lastName, String document, String email, String phone) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.document = document;
		this.email = email;
		this.phone = phone;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}
