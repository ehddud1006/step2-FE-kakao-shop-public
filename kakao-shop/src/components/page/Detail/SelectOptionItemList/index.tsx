import { Fragment, MouseEventHandler } from 'react';

import SelectOptionItem from '@components/page/Detail/SelectOptionItem';

import { UserSelectOption } from '@hooks/page/Detail/useOptionForm';

type Props = {
  options?: UserSelectOption[];
  onDeleteOption: (id: number) => MouseEventHandler<HTMLButtonElement>;
  onIncreaseQuantity: (id: number) => MouseEventHandler<HTMLButtonElement>;
  onDecreaseQuantity: (id: number) => MouseEventHandler<HTMLButtonElement>;
};
const SelectOptionItemList = ({ options, onDeleteOption, onIncreaseQuantity, onDecreaseQuantity }: Props) => {
  return (
    <Fragment>
      {options?.map(option => {
        if (!option.isSelected) return null;
        return (
          <SelectOptionItem
            key={option.id}
            option={option}
            onDeleteOption={onDeleteOption}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        );
      })}
    </Fragment>
  );
};

export default SelectOptionItemList;