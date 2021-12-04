const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const getById = (id) => boardRepo.getById(id);

const create = (data) => boardRepo.create(data);

const updateById = (id, data) => boardRepo.updateById(id, data);

const deleteById = (id) => boardRepo.deleteById(id);

module.exports = { getAll, getById, create, updateById, deleteById };
