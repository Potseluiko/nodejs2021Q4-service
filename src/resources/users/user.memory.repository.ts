import * as uuid from 'uuid';

type IUser = {
  id: string;
  name: string;
  login: string;
};

const records: Record<string, IUser> = {};

const getAll = async () => Object.values(records);

const getById = async (id: string) => {
  if (!id || !records[id]) {
    return null;
  }

  return records[id];
};

const create = (data: IUser) => {
  const id = uuid.v4();
  const { name, login } = data;

  records[id] = {
    name,
    login,
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

export default { getAll, getById, create, updateById, deleteById };
