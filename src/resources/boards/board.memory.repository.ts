import { v4 } from 'uuid';

const records: Record<string, object> = {};

const getAll = async () => Object.values(records);

const getById = async (id: string) => {
  if (!id || !records[id]) {
    return null;
  }

  return records[id];
};

const create = (data: object) => {
  const id = v4();

  records[id] = {
    ...(data || {}),
    id,
  };

  return records[id];
};

const updateById = (id: string, data: object) => {
  if (!id || !records[id]) {
    return null;
  }

  records[id] = {
    ...records[id],
    ...(data || {}),
    id,
  };

  return records[id];
};

const deleteById = (id: string) => {
  if (!id || !records[id]) {
    return null;
  }

  delete records[id];

  return { id };
};

module.exports = { getAll, getById, create, updateById, deleteById };
