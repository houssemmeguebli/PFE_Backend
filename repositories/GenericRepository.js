
class GenericRepository {
    constructor(model) {
        this.model = model;
    }

    // Get all records
    async findAll() {
        return await this.model.findAll();
    }

    // Get record by id
    async findById(id) {
        return await this.model.findByPk(id);
    }

    // Create a new record
    async create(data) {
        return await this.model.create(data);
    }

    // Update a record by id
    async update(id, data) {
        const record = await this.findById(id);
        if (record) {
            return await record.update(data);
        }
        return null;
    }

    // Delete a record by id
    async delete(id) {
        const record = await this.findById(id);
        if (record) {
            await record.destroy();
            return true;
        }
        return false;
    }
}

module.exports = GenericRepository;
