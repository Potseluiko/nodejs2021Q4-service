import * as uuid from 'uuid';

type ITask = {
  id: string;
  title: string;
  description: string;
  order: number;
  userId: string;
  boardId: string;
  columnId: string;
};

const records: Record<string, ITask> = {};

const getAll = async () => Object.values(records);

const getById = async (id: string) => {
  if (!id || !records[id]) {
    return null;
  }

  return records[id];
};

const create = (data: ITask) => {
  const id = uuid.v4();

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

export default { getAll, getById, create, updateById, deleteById };
