export interface PageResultList<T> {
    data: T[];
    totalCount: number;
    currentPage: number;
    rowsPerPage: number;
}
