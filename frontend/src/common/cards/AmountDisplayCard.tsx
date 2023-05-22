import { Card, Text, Metric } from '@tremor/react';

interface IAmountDisplayCardProp {
  title: string;
  amount: number;
  topDecorationColor?:
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';
}

const AmountDisplayCard = ({
  title,
  amount,
  topDecorationColor,
}: IAmountDisplayCardProp) => {
  return (
    <Card decoration={'top'} decorationColor={topDecorationColor}>
      <Text>{title}</Text>
      <Metric>{amount} Rs</Metric>
    </Card>
  );
};

export default AmountDisplayCard;
