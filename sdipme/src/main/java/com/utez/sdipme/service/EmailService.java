package com.utez.sdipme.service;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;

// Utility service for sending automated system emails via Hostinger SMTP.
public class EmailService {

    private static final String REMITENTE = "no-reply@sdipme.online";
    private static final String PASSWORD = "O$!@2W&n$7";
    private static final String HOST = "smtp.hostinger.com";
    private static final String PORT = "465";

    private static final String LOGO_URL = "https://res.cloudinary.com/lt47u5el/image/upload/v1786517664/logo-light-txt_jgpgit.png";

    private static boolean enviarCorreo(String destinatario, String asunto, String contenidoHtml) {
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
            mensaje.setSubject(asunto);
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

    public static boolean enviarCorreoVerificacion(String destinatario, String token) {
        String linkActivacion = "http://www.sdipme.online/pages/login.jsp?token=" + token;
        String asunto = "SDIPME - Activa tu cuenta universitaria";

        String templateHtml = """
            <!DOCTYPE html>
            <html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>¡Bienvenido a SDIPME!</title>
            <style>
              body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
              table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
              img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
              body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #eef1f3; }
              a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
              @media only screen and (max-width: 600px) {
                .email-container { width: 100% !important; border-radius: 0 !important; }
                .fluid-padding { padding-left: 24px !important; padding-right: 24px !important; }
                .header-padding { padding: 36px 24px 28px !important; }
                .title-text { font-size: 22px !important; }
                .cta-btn { width: 100% !important; }
                .cta-link { display: block !important; width: 100% !important; box-sizing: border-box; }
              }
            </style>
            </head>
            <body style="margin:0;padding:0;background-color:#eef1f3;">
              <center style="width:100%;background-color:#eef1f3;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef1f3;">
                <tr>
                  <td align="center" style="padding:32px 16px;">
                    <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(15,45,70,0.12);">
                      <tr>
                        <td class="header-padding" align="center" bgcolor="#14535f" style="background-image:linear-gradient(135deg,#1a8f6f 0%,#0f3d5c 100%);background-color:#14535f;padding:48px 30px 36px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" align="center">
                            <tr>
                              <td align="center" valign="middle" bgcolor="#ffffff" style="width:96px;height:96px;border-radius:50%;background-color:#ffffff;">
                                <img src="URL_DEL_LOGO_AQUI" width="58" alt="SDIPME" style="display:block;width:58px;height:auto;margin:0 auto;">
                              </td>
                            </tr>
                          </table>
                          <p style="margin:22px 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:1.5px;color:#d9ece7;text-transform:uppercase;">Sistema para donacion, intercambio y prestamo de material escolar</p>
                          <h1 class="title-text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:1.3;font-weight:800;color:#ffffff;">¡Bienvenido a SDIPME!</h1>
                        </td>
                      </tr>
                      <tr>
                        <td class="fluid-padding" style="padding:40px 40px 8px 40px;font-family:Arial,Helvetica,sans-serif;">
                          <p style="margin:0;font-size:16px;line-height:1.6;color:#484848;">Gracias por registrarte. Para poder iniciar sesión y ver el catálogo, necesitas activar tu cuenta.</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:32px 40px 32px 40px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" class="cta-btn">
                            <tr>
                              <td align="center" bgcolor="#ef9d4e" style="border-radius:8px;background-image:linear-gradient(135deg,#f2a051 0%,#e8872d 100%);background-color:#ef9d4e;">
                                <a href="URL_DE_ACTIVACION_AQUI" target="_blank" class="cta-link" style="display:inline-block;padding:15px 34px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:8px;">Activar mi cuenta &rarr;</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td class="fluid-padding" style="padding:28px 40px 40px 40px;font-family:Arial,Helvetica,sans-serif;">
                          <p style="margin:0;font-size:14px;line-height:1.6;color:#6b6b6b;">Si tú no solicitaste este registro, ignora este correo.<br>Tu cuenta no será activada.</p>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#e5e5e5" style="background-color:#e5e5e5;padding:20px 30px;font-family:Arial,Helvetica,sans-serif;">
                          <p style="margin:0;font-size:13px;color:#767676;"><span style="color:#0a2535;font-weight:bold;">SDIPME</span>&nbsp;&nbsp;·&nbsp;&nbsp;Este es un mensaje automático, por favor no respondas a este correo.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              </center>
            </body>
            </html>
            """;

        String contenidoHtml = templateHtml
                .replace("URL_DEL_LOGO_AQUI", LOGO_URL)
                .replace("URL_DE_ACTIVACION_AQUI", linkActivacion);

        return enviarCorreo(destinatario, asunto, contenidoHtml);
    }

    public static boolean enviarCorreoRecuperacion(String destinatario, String token) {
        String enlaceRecuperacion = "http://127.0.0.1:8080/sdipme/restablecer-password.html?token=" + token;
        String asunto = "SDIPME - Recuperacion de Contraseña o Desbloqueo";

        String templateHtml = """
            <!DOCTYPE html>
            <html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Restablecer contraseña · SDIPME</title>
            <style>
              body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
              table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
              img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
              body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #eef1f3; }
              @media only screen and (max-width: 600px) {
                .email-container { width: 100% !important; border-radius: 0 !important; }
                .fluid-padding { padding-left: 24px !important; padding-right: 24px !important; }
                .header-padding { padding: 36px 24px 28px !important; }
                .title-text { font-size: 20px !important; }
                .cta-btn { width: 100% !important; }
                .cta-link { display: block !important; width: 100% !important; box-sizing: border-box; }
              }
            </style>
            </head>
            <body style="margin:0;padding:0;background-color:#eef1f3;">
              <center style="width:100%;background-color:#eef1f3;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef1f3;">
                <tr>
                  <td align="center" style="padding:32px 16px;">
                    <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(15,45,70,0.12);">
                      <tr>
                        <td class="header-padding" align="center" bgcolor="#14535f" style="background-image:linear-gradient(135deg,#1a8f6f 0%,#0f3d5c 100%);background-color:#14535f;padding:48px 30px 36px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" align="center">
                            <tr>
                              <td align="center" valign="middle" bgcolor="#ffffff" style="width:96px;height:96px;border-radius:50%;background-color:#ffffff;">
                                <img src="URL_DEL_LOGO_AQUI" width="58" alt="SDIPME" style="display:block;width:58px;height:auto;margin:0 auto;">
                              </td>
                            </tr>
                          </table>
                          <p style="margin:22px 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:1.5px;color:#d9ece7;text-transform:uppercase;">Sistema Docente e Institucional</p>
                          <h1 class="title-text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.3;font-weight:800;color:#ffffff;text-transform:uppercase;">¡Restablecer contraseña!</h1>
                        </td>
                      </tr>
                      <tr>
                        <td class="fluid-padding" style="padding:40px 40px 8px 40px;font-family:Arial,Helvetica,sans-serif;">
                          <p style="margin:0;font-size:16px;line-height:1.6;color:#484848;">Has solicitado restablecer tu contraseña para tu cuenta de SDIPME. Para elegir una nueva contraseña y recuperar el acceso a tu cuenta, haz clic en el botón a continuación:</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:32px 40px 32px 40px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" class="cta-btn">
                            <tr>
                              <td align="center" bgcolor="#ef9d4e" style="border-radius:8px;background-image:linear-gradient(135deg,#f2a051 0%,#e8872d 100%);background-color:#ef9d4e;">
                                <a href="URL_DE_RESTABLECIMIENTO_AQUI" target="_blank" class="cta-link" style="display:inline-block;padding:15px 34px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:8px;">Restablecer mi contraseña &rarr;</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td class="fluid-padding" style="padding:28px 40px 40px 40px;font-family:Arial,Helvetica,sans-serif;">
                          <p style="margin:0;font-size:14px;line-height:1.6;color:#6b6b6b;">Si tú no solicitaste este cambio, puedes ignorar este correo de forma segura. Tu contraseña actual no cambiará y no se realizarán acciones en tu cuenta.</p>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#e5e5e5" style="background-color:#e5e5e5;padding:20px 30px;font-family:Arial,Helvetica,sans-serif;">
                          <p style="margin:0;font-size:13px;color:#767676;"><span style="color:#0a2535;font-weight:bold;">SDIPME</span>&nbsp;&nbsp;·&nbsp;&nbsp;Este es un mensaje automático, por favor no respondas a este correo.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              </center>
            </body>
            </html>
            """;

        String contenidoHtml = templateHtml
                .replace("URL_DEL_LOGO_AQUI", LOGO_URL)
                .replace("URL_DE_RESTABLECIMIENTO_AQUI", enlaceRecuperacion);

        return enviarCorreo(destinatario, asunto, contenidoHtml);
    }
}