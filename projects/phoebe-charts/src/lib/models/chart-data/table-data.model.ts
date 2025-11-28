export interface TableColumn {
  id: string;
  header: string;
  field: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

export interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  pageSize?: number;
  currentPage?: number;
}

export const DEFAULT_TABLE_COLUMN: Partial<TableColumn> = {
  sortable: true,
  filterable: true,
  align: 'left',
};

export const DEFAULT_TABLE_DATA: Partial<TableData> = {
  sortDirection: 'asc',
  pageSize: 10,
  currentPage: 1,
};

