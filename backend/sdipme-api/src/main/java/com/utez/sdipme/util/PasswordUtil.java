package com.utez.sdipme.util;

import org.mindrot.jbcrypt.BCrypt;

// Utility class for secure password hashing using BCrypt algorithm.
public class PasswordUtil {

    // Hashes a plain text password with a generated salt.
    public static String hashPassword(String plainTextPassword) {
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
    }

    // Verifies if an unhashed password matches the stored BCrypt hash.
    public static boolean checkPassword(String plainTextPassword, String hashedPassword) {
        return BCrypt.checkpw(plainTextPassword, hashedPassword);
    }
}