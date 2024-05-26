module.exports = {
    /**
     * Valida los datos de un regalo.
     * @param {string} name - El nombre del regalo.
     * @param {string} description - La descripción del regalo.
     * @param {string} url - La URL del regalo.
     * @param {number} price - El precio del regalo.
     * @throws {Error} Se lanza un error si los datos no son válidos.
     */
    validatePresentData: (name, description, url, price) => {
        if (!name) {
            throw new Error("El nombre del regalo es obligatorio");
        }
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error("El nombre del regalo debe ser un texto no vacío");
        }
        if (description && typeof description !== 'string') {
            throw new Error("La descripción del regalo debe ser un texto");
        }
        if (url && typeof url !== 'string') {
            throw new Error("La URL del regalo debe ser un texto");
        }
        if (!price || typeof price !== 'number' || price <= 0) {
            throw new Error("El precio del regalo debe ser un número mayor que cero");
        }
    }
};