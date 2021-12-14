import * as uuid from 'uuid';

type IBoard = {
  id: string;
  title: string;
  columns: object[];
};

const records: Record<string, IBoard> = {};

const getAll = async () => Object.values(records);

const getById = async (id: string) => {
  if (!id || !records[id]) {
    return null;
  }

  return records[id];
};

const create = (data: IBoard) => {
  const id = uuid.v4();
  const { title, columns } = data;

  records[id] = {
    id,
    title,
    columns,
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
