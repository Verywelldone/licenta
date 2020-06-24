/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.models.DTO.user;

public class PasswordRecoveryDTO {

    String rememberedField;

    String securityQuestion;

    public String getRememberedField() {
        return rememberedField;
    }

    public void setRememberedField(String rememberedField) {
        this.rememberedField = rememberedField;
    }

    public String getSecurityQuestion() {
        return securityQuestion;
    }

    public void setSecurityQuestion(String securityQuestion) {
        this.securityQuestion = securityQuestion;
    }
}
