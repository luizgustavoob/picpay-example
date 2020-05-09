package br.com.luizgustavo.picpaypayment.controller.exception;

public class StatusChangeException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public StatusChangeException(String exception) {
		super(exception);
	}

}
