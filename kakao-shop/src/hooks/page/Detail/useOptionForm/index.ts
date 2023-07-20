import { productDetailRequest } from '@store/Detail/reducers';
import { Option } from '@store/Home/reducers';
import { RootState } from '@store/index';
import { useEffect, useState, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useOptionForm = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.detail.product);
  const [options, setOptions] = useState<UserSelectOption[] | undefined>();
  const totals = options?.reduce(calculateTotal, {
    quantity: 0,
    price: 0,
  } as Totals);

  useEffect(() => {
    if (!productId) return;

    dispatch(productDetailRequest(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    setOptions(getUserSelectOption(product?.options));
  }, [product]);

  const onSelectOption = (id: number) => {
    setOptions(updateSelectedOptions(id));
  };

  const increaseQuantity =
    (id: number): MouseEventHandler<HTMLButtonElement> =>
    () => {
      if (!options) return;
      setOptions(updateQuantityOptions(id, options, UP1));
    };

  const decreaseQuantity =
    (id: number): MouseEventHandler<HTMLButtonElement> =>
    () => {
      if (!options) return;
      setOptions(updateQuantityOptions(id, options, DOWN1));
    };

  return {
    state: {
      product,
      options,
      totals,
    },
    handler: {
      onSelectOption,
      increaseQuantity,
      decreaseQuantity,
    },
  };
};

const UP1 = 1;
const DOWN1 = -1;

const addSelectProperty = (option: Option): UserSelectOption => ({
  ...option,
  isSelected: false,
  quantity: 0,
});

const getUserSelectOption = (options?: Option[]) => {
  if (!options) return;

  return options?.map(addSelectProperty);
};

const updateOption = (id: number, option: UserSelectOption): UserSelectOption => {
  if (option.id === id) {
    return {
      ...option,
      isSelected: true,
      quantity: 1,
    };
  }
  return option;
};

const updateSelectedOptions = (id: number) => (prevOptions?: UserSelectOption[]) => {
  return prevOptions?.map(option => updateOption(id, option));
};

const calculateTotal = (totals: Totals, item: UserSelectOption) => {
  totals.quantity += item.quantity;
  totals.price += item.price * item.quantity;
  return totals;
};

const isValidQuantityChange = (quantity: number, quantityChange: number): boolean =>
  !(quantity === 1 && quantityChange === DOWN1);

const updateQuantity = (option: UserSelectOption, quantityChange: number): UserSelectOption => ({
  ...option,
  quantity: option.quantity + quantityChange,
});

const updateQuantityOptions = (id: number, options: UserSelectOption[], quantityChange: number) =>
  options?.map(option => {
    if (option.id === id && isValidQuantityChange(option.quantity, quantityChange))
      return updateQuantity(option, quantityChange);

    return option;
  });

export type UserSelectOption = {
  isSelected: boolean;
  quantity: number;
} & Option;

export type Totals = {
  quantity: number;
  price: number;
};
