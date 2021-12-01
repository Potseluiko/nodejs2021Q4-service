const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const create = (data) => usersRepo.create(data);

const updateById = (id, data) => usersRepo.updateById(id, data);

const deleteById = (id) => usersRepo.deleteById(id);

module.exports = { getAll, getById, create, updateById, deleteById };
