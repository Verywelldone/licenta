package jwtspring.service.emailsmtp;

import jwtspring.payload.request.SignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailSmtpService {

   private JavaMailSender javaMailSender;


   @Autowired
   public EmailSmtpService(JavaMailSender javaMailSender){
      this.javaMailSender = javaMailSender;
   }


   public void sendRegisterEmail(SignupRequest signupRequest) throws MailException {
      SimpleMailMessage mailMessage = new SimpleMailMessage();
      mailMessage.setTo(signupRequest.getEmail());
      mailMessage.setFrom("spring.mail.username");
      mailMessage.setSubject("Happypets Account");
      mailMessage.setText(
              "Wellcome, "+ signupRequest.getUserDetails().getFirstName() + "."
                      + "You can now connect any time by using these provided information:"
                      + "Username: " +signupRequest.getUsername()+"  "
                      + "Password: " +signupRequest.getPassword()+". "
                      + " This is a confirmation email. Please do not respond."
      );

      javaMailSender.send(mailMessage);
   }
}
