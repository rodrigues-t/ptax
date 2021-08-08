import ILoadState from "../../../shared/models/ILoadState";

const getDefaultLoadState = (): ILoadState => ({
  isLoading: false, 
  hasLastLoadFailed: false, 
  isPristine: true,
  apiError: null,
});

export {
  getDefaultLoadState,
};
