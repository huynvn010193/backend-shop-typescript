// TODO: không dung interface được vì phải là Union Type còn interface chỉ dùng mô tã cấu trúc object.
type QueryValue = string | string[] | number | boolean | undefined;

// TODO: object có dạng key là string và value phải là các kiểu trong QueryValue
export interface QueryParams {
  [key: string]: QueryValue;
}

interface ParsedQuery {
  [key: string]: any;
}

export interface GetListItemsParams<T> {
  page?: number;
  limit?: number;
  filter?: Record<string, unknown>;
  sort?: string | undefined;
  select?: string | undefined;
}

export const LIMIT_RECORD_DEFAULT = 10;

//TODO: [hàm parseBracketQuery]
export const parseBracketQuery = (query: QueryParams): ParsedQuery => {
  const ARRAY_OPERATORS = new Set(['$in', '$nin', '$all', '$and', '$or', '$nor']);
  const parsedQuery = Object.entries(query).reduce<ParsedQuery>((acc, [key, value]) => {
    // Ví dụ: "price[gte]" → ["price[gte]", "price", "gte"]
    const match = key.match(/^(.+)\[(.+)\]$/);

    if (match) {
      const field = match[1];
      const operator = `$${match[2]}`;
      if (field === undefined || operator === undefined) {
        return acc;
      }

      if (!acc[field]) {
        acc[field] = {};
      }

      const fieldQuery = acc[field] as Record<string, unknown>;

      fieldQuery[operator] =
        ARRAY_OPERATORS.has(operator) && !Array.isArray(value) ? [value] : value;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});

  return parsedQuery;
};

export const parseListQuery = <T>(query: QueryParams): GetListItemsParams<T> => {
  const { page, limit, sort, select, ...filterQuery } = query;
  const parsedPage = typeof page === 'string' || typeof page === 'number' ? Number(page) : 1;
  const parsedLimit = typeof limit === 'string' || typeof limit === 'number' ? Number(limit) : 10;

  // TODO: select = 'name,price,stock'; parsedSelect = 'name price stock'
  const parsedSort = typeof sort === 'string' ? sort.split(',').join(' ') : undefined;
  const parsedSelect = typeof select === 'string' ? select.split(',').join(' ') : undefined;

  const parsedFilter = parseBracketQuery(filterQuery);

  return {
    page: parsedPage,
    limit: parsedLimit,
    sort: parsedSort,
    select: parsedSelect,
    filter: parsedFilter,
  };
};
