package br.com.luizgustavo.picpaypayment.model.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusChangeForm {

	private String referenceId;
	private String authorizationId;
}
