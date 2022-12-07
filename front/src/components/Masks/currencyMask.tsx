import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface MoneyCustomProps {
  onChange: (event: { target: { money: string; value: string } }) => void;
  money: string;
}

export const MoneyMaskCustom = forwardRef<HTMLElement, MoneyCustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={Number}
        scale={2}
        signed={false}
        thousandsSeparator={'.'}
        padFractionalZeros={true}
        normalizeZeros={true}
        radix={','}
        mapToRadix={['.']}
        onAccept={(value: any) =>
          onChange({ target: { money: props.money, value } })
        }
        unmask={true}
      />
    );
  }
);
