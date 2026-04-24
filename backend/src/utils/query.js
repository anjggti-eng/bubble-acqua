export const parseLimit = (value, fallback = 50, max = 200) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(parsed, max);
};

export const parseSort = (rawSort, allowedColumns, fallback = 'created_at desc') => {
  if (!rawSort) return fallback;

  let column = rawSort;
  let direction = 'asc';

  if (rawSort.startsWith('-')) {
    column = rawSort.slice(1);
    direction = 'desc';
  } else if (rawSort.includes(':')) {
    const [field, dir] = rawSort.split(':');
    column = field;
    direction = dir?.toLowerCase() === 'desc' ? 'desc' : 'asc';
  }

  if (!allowedColumns.includes(column)) {
    return fallback;
  }

  return `${column} ${direction}`;
};

export const addFilter = (filters, params, sql, value) => {
  if (value === undefined || value === null || value === '') return;
  params.push(value);
  filters.push(sql.replace('?', `$${params.length}`));
};
