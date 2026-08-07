package com.utez.sdipme.util;

import com.utez.sdipme.service.EmailService;

public class TestEmail {

    // Este es el método MAIN exacto que Java busca para ejecutar
    public static void main(String[] args) {
        // 1. Pon tu correo personal real para recibir la prueba (ej. Gmail, Outlook, etc.)
        String miCorreoPersonal = "angelromero273001@gmail.com";

        System.out.println("=========================================");
        System.out.println(">>> [PRUEBA] Iniciando envío de correo vía Hostinger...");

        // 2. Ejecutamos el servicio de correo
        boolean exito = EmailService.enviarCorreoVerificacion(miCorreoPersonal, "TOKEN_PRUEBA_ABC123");

        if (exito) {
            System.out.println("\n✅ ¡PRUEBA EXITOSA! Revisa tu bandeja de entrada (y la carpeta de SPAM por si acaso).");
        } else {
            System.out.println("\n❌ ¡FALLÓ LA PRUEBA! Revisa los mensajes en rojo de la consola para ver el error.");
        }
        System.out.println("=========================================");
    }
}