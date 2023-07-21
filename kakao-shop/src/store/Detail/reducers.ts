import { Product } from '@store/Home/reducers';
import { AxiosError, AxiosResponse } from 'axios';
import { produce, Draft } from 'immer';

import { AddCartPayload } from '@components/page/Detail/PurchaseButtons';

export const SET_PRODUCT_DETAIL_LOADING_STATE = 'detail/SET_PRODUCT_DETAIL_LOADING_STATE';
export const FETCH_PRODUCT_DETAIL = 'detail/FETCH_PRODUCT_DETAIL';
export const SET_PRODUCT_DETAIL = 'detail/SET_PRODUCT_DETAIL';
export const ADD_CART_ITEM = 'detail/ADD_CART_ITEM';

export const setLoadingState = (): SetProductDetailLoadingStateAction => ({
  type: SET_PRODUCT_DETAIL_LOADING_STATE,
});

export const productDetailRequest = (payload: string): FetchProductDetailAction => ({
  type: FETCH_PRODUCT_DETAIL,
  payload,
});

export const setProductDetail = (payload: AxiosResponse<ProductDetailResponse>): SetProductDetailAction => ({
  type: SET_PRODUCT_DETAIL,
  payload,
});

export const addCartItem = (payload: AddCartPayload[]): AddCartItemAction => ({
  type: ADD_CART_ITEM,
  payload,
});

export const initialState: DetailState = {
  isLoading: false,
  error: null,
  product: undefined,
};

export const DetailReducer = produce(
  (
    draft: Draft<DetailState>,
    action: SetProductDetailLoadingStateAction | SetProductDetailAction | AddCartItemAction,
  ) => {
    switch (action.type) {
      case SET_PRODUCT_DETAIL_LOADING_STATE:
        draft.isLoading = true;
        break;

      case SET_PRODUCT_DETAIL:
        draft.product = action.payload.data.response;
        draft.isLoading = false;
        break;

      // case ADD_CART_ITEM:
      //   draft.product = action.payload.data.response;
      //   draft.isLoading = false;
      //   break;
    }
  },
  initialState,
);

export type DetailState = {
  isLoading: boolean;
  error: AxiosError | null;
  product?: Product;
};

export type SetProductDetailLoadingStateAction = {
  type: typeof SET_PRODUCT_DETAIL_LOADING_STATE;
};

export type FetchProductDetailAction = {
  type: typeof FETCH_PRODUCT_DETAIL;
  payload: string;
};

export type AddCartItemAction = {
  type: typeof ADD_CART_ITEM;
  payload: AddCartPayload[];
};

export type ProductDetailResponse = {
  sucess: boolean;
  response: Product;
  error: boolean;
};

export type SetProductDetailAction = {
  type: typeof SET_PRODUCT_DETAIL;
  payload: AxiosResponse<ProductDetailResponse>;
};