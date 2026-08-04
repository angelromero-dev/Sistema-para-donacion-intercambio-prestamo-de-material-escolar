package org.utez.sdipme.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    private static final String URL = "jdbc:oracle:thin:@localhost:1521:xe";
    private static final String USER = "SYSTEM";
    private static final String PASSWORD = "123";

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