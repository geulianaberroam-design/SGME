CREATE TABLE pago (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    comprobante VARCHAR(100) NOT NULL,
    id_matricula INT NOT NULL,

    CONSTRAINT fk_pago_matricula
        FOREIGN KEY (id_matricula)
        REFERENCES matricula(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);