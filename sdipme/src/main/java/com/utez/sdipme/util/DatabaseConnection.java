package com.utez.sdipme.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    private static final String TNS_ALIAS = "sdipmedb_high";
    private static final String TNS_ADMIN = "/Oracle/Wallet_MIDB";

    private static final String URL = "jdbc:oracle:thin:@" + TNS_ALIAS + "?TNS_ADMIN=" + TNS_ADMIN;
    private static final String USER = "ADMIN";
    private static final String PASSWORD = "$qfUKI#^f7OI0&";

    public static Connection getConnection() throws SQLException {
        try {
            // Cargar el driver de Oracle JDBC
            Class.forName("oracle.jdbc.OracleDriver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            System.err.println("Error CRÍTICO: No se encontró el driver de Oracle JDBC.");
            throw new SQLException(e);
        }
    }
}