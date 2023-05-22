import React from 'react';
import {
  Text,
  DateRangePicker,
  SelectBox,
  SelectBoxItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Button,
} from '@tremor/react';
import HeaderTitle from '../../common/typography/Header';

const Datas = [
  {
    id: 1,
    category: 'tiffin',
    amount: 450,
    totalExpense: 45000,
    RemainingExpense: 20000,
    issuedDate: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    category: 'Food',
    amount: 550,
    totalExpense: 15000,
    RemainingExpense: 10000,
    issuedDate: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    category: 'Entertainment',
    amount: 450,
    totalExpense: 45000,
    RemainingExpense: 20000,
    issuedDate: new Date().toLocaleDateString(),
  },
  {
    id: 4,
    category: 'Education',
    amount: 450,
    totalExpense: 45000,
    RemainingExpense: 20000,
    issuedDate: new Date().toLocaleDateString(),
  },
  {
    id: 5,
    category: 'Rent',
    amount: 450,
    totalExpense: 45000,
    RemainingExpense: 20000,
    issuedDate: new Date().toLocaleDateString(),
  },
  {
    id: 6,
    category: 'Tiffin',
    amount: 450,
    totalExpense: 45000,
    RemainingExpense: 20000,
    issuedDate: new Date().toLocaleDateString(),
  },
];

const Expenses = () => {
  return (
    <div>
      <div className="my-5 mb-6">
        <HeaderTitle title="My Expenses" size={24}></HeaderTitle>
      </div>

      <div className="flex flex-row justify-end space-x-5">
        <DateRangePicker className="w-[400px]" />
        <SelectBox className="w-[200px]">
          <SelectBoxItem value="Tiffin" text="Tiffin"></SelectBoxItem>
          <SelectBoxItem
            value="Entertainment"
            text="Entertainment"
          ></SelectBoxItem>
          <SelectBoxItem value="Food" text="Food"></SelectBoxItem>
          <SelectBoxItem value="Education" text="Education"></SelectBoxItem>
          <SelectBoxItem
            value="Personal Development"
            text="Personal Development"
          ></SelectBoxItem>
        </SelectBox>
      </div>

      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Total Expense</TableHeaderCell>
            <TableHeaderCell>Remaining Expense</TableHeaderCell>
            <TableHeaderCell>IssuedDate</TableHeaderCell>
            <TableHeaderCell>Modify</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Datas.map((data) => (
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.category}</TableCell>
              <TableCell>{data.amount}</TableCell>
              <TableCell>{data.totalExpense}</TableCell>
              <TableCell>{data.RemainingExpense}</TableCell>
              <TableCell>{`${data.issuedDate}`}</TableCell>
              <TableCell>
                <Button size={'sm'} color={'red'}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-row justify-end py-5 items-center space-x-5">
        <Button color="red">Prev</Button>
        <Text className="font-bold">1</Text>
        <Button color="blue">Next</Button>
      </div>
    </div>
  );
};

export default Expenses;
