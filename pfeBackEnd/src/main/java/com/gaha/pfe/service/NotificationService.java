package com.gaha.pfe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendNotification(String recipientEmail, String message,Long id ) {
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        try {
            helper.setTo(recipientEmail);
            helper.setSubject("Request received");
            helper.setText(message, true); // Set the second parameter to true for HTML content
            emailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }
    }
}
