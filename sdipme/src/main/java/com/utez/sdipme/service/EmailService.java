package com.utez.sdipme.service;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailService {

    private static final String REMITENTE = "no-reply@sdipme.online";
    private static final String PASSWORD = "O$!@2W&n$7";

    private static final String HOST = "smtp.hostinger.com";
    private static final String PORT = "465";

    public static boolean enviarCorreoVerificacion(String destinatario, String token) {
        System.out.println(">>> [EMAIL SERVICE] Intentando conectar con Hostinger para enviar correo a: " + destinatario);

        Properties props = new Properties();
        props.put("mail.smtp.host", HOST);
        props.put("mail.smtp.port", PORT);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.ssl.enable", "true");

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(REMITENTE, PASSWORD);
            }
        });

        try {
            Message mensaje = new MimeMessage(session);
            mensaje.setFrom(new InternetAddress(REMITENTE));
            mensaje.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinatario));
            mensaje.setSubject("SDIPME - Activa tu cuenta universitaria");

            String linkActivacion = "http://localhost:8080/sdipme_war_exploded/api/activar?token=" + token;
            String contenidoHtml = "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;'>"
                    + "<h2 style='color: #0056b3;'>¡Bienvenido a SDIPME!</h2>"
                    + "<p>Gracias por registrarte. Para poder iniciar sesión y ver el catálogo, necesitas activar tu cuenta.</p>"
                    + "<br>"
                    + "<a href='" + linkActivacion + "' style='background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Haz clic aquí para Activar tu Cuenta</a>"
                    + "<br><br>"
                    + "<p style='font-size: 12px; color: #777;'>Si tú no solicitaste este registro, ignora este correo.</p>"
                    + "</div>";

            mensaje.setContent(contenidoHtml, "text/html; charset=utf-8");

            Transport.send(mensaje);
            System.out.println(">>> [EMAIL SERVICE OK] ¡Correo enviado con éxito a " + destinatario + "!");
            return true;

        } catch (MessagingException e) {
            System.err.println(">>> [EMAIL SERVICE ERROR] Fallo al enviar el correo: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    // Sends a secure link for password reset or account unlock.
    public static boolean enviarCorreoRecuperacion(String destinatario, String token) {
        String enlaceRecuperacion = "http://localhost:8080/sdipme_war_exploded/restablecer-password.html?token=" + token;

        String asunto = "SDIPME - Recuperacion de Contraseña o Desbloqueo";
        String contenidoHtml = "<html><body style='font-family: Arial; padding: 20px;'>"
                + "<h2>Atención de Seguridad - SDIPME UTEZ</h2>"
                + "<p>Has solicitado restablecer tu contraseña o tu cuenta fue bloqueada por intentos fallidos.</p>"
                + "<a href='" + enlaceRecuperacion + "' style='display:inline-block; padding:10px 20px; background:#00875A; color:white; text-decoration:none;'>Restablecer Contraseña</a>"
                + "</body></html>";

        return enviarCorreo(destinatario, asunto, contenidoHtml);
    }
}