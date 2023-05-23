import { Text } from '@tremor/react';
import React from 'react';
interface IHeaderProps {
  size: number;
  title: string;
}

const HeaderTitle = ({ size, title }: IHeaderProps) => {
  return (
    <Text className={`text-black  text-[${size}px] font-bold`}>{title}</Text>
  );
};

export default HeaderTitle;
