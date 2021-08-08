export default interface ILoadState {
    isLoading: boolean;
    hasLastLoadFailed: boolean;
    isPristine: boolean;
    apiError: ApiError | null;
}

export interface ApiError {
    code: number,
    message: string | null,
}
