export class CommonEntity {
    public id: string;
    public createdOnDate: string | any;
    public createdByUserName: string;
    public lastModifiedByUserName: string;
}

export class Responses<T> {
    public code: 200 | 400 | 401 | 404 | 500;
    public message: string;
    public data: T;
    public count: number;
    public isSuccess: boolean;
    public totalTime: number
    accessToken: string;
    refreshToken: string;
    user: any;
    errorMessage: string;
}

export class QueryParams {
    public accountNumber?: string;
    public dateMin?: string;
    public dateMax?: string;
    public categoryId?: string;
    public direction?: 'IN' | 'OUT';
    public size?: number;
    public page?: number;
}

export class Pagination<T> {
    public content: T[];
    public numberOfElements: number;
    public page: number;
    public size: number;
    public totalElements: number;
    public totalPages: number;
    public sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    public pageable: {
        offset: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        pageSize: number;
        pageNumber: number;
        paged: boolean;
        unpaged: boolean;
    };
    public first: boolean;
    public last: boolean;
}