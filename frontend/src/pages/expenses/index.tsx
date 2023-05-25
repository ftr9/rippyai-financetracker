import React, { useEffect, useState } from 'react';
import {
  Text,
  DateRangePicker,
  DateRangePickerValue,
  SelectBox,
  SelectBoxItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Button,
  Divider,
} from '@tremor/react';
import HeaderTitle from '../../common/typography/Header';
import AddExpensePopup from '../../common/popup/AddExpensePopup';
import moment from 'moment';

import { useExpensesStore } from '../../store/useExpensesStore';
import { useMonthlyStore } from '../../store/useMonthlyStore';
import { ViewfinderCircleIcon } from '@heroicons/react/20/solid';

const Expenses = () => {
  const {
    data: { payload },
  } = useMonthlyStore();

  const { isFetchingExpense, fetchExpenses, expensesList } = useExpensesStore();
  const [searchParams, setSearchParams] = useState({
    category: '',
    from: '',
    to: '',
    page: 1,
  });
  const [dateRangeValue, setDateRangeValue] = useState<DateRangePickerValue>();
  const [searchToggle, setSearchToggle] = useState(false);

  useEffect(() => {
    const fetchUserExpense = async () => {
      await fetchExpenses(
        searchParams.category,
        searchParams.from,
        searchParams.to,
        searchParams.page,
      );
    };
    fetchUserExpense();
  }, [searchToggle, searchParams.page]);

  const onDateValueChanged = (value: DateRangePickerValue) => {
    setDateRangeValue(value);
    if (value[0]) {
      setSearchParams((state) => ({
        ...state,
        from: `${value[0]}`,
      }));
    }
    if (value[1]) {
      setSearchParams((state) => ({
        ...state,
        to: `${value[1]}`,
      }));
    } else {
      setSearchParams((state) => ({
        ...state,
        to: `${value[0]}`,
      }));
    }
  };

  const onOptionValueChanged = (value: string) => {
    setSearchParams((state) => ({ ...state, category: value }));
  };

  const searchBtnClickHandle = async () => {
    setSearchParams((state) => ({ ...state, page: 1 }));
    setSearchToggle(!searchToggle);
  };

  if (isFetchingExpense && expensesList.length === 0) {
    return <div>Loading your expenses hold on ....</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center my-5 mb-6">
        <HeaderTitle title="My Expenses" size={24}></HeaderTitle>
        <AddExpensePopup />
      </div>

      <div className="flex md:flex-row md:space-y-0 flex-col justify-end space-y-4 md:space-x-5">
        <DateRangePicker
          value={dateRangeValue}
          onValueChange={onDateValueChanged}
          className="w-[100%] md:w-[400px]"
        />

        {payload?.categories && (
          <SelectBox
            value={searchParams.category}
            onValueChange={onOptionValueChanged}
            className="w-[100%]  md:w-[200px]"
          >
            {payload.categories.map((category) => (
              <SelectBoxItem key={category} title={category} value={category} />
            ))}
          </SelectBox>
        )}
        <Button
          className="w-[100px] md:w-auto"
          loading={isFetchingExpense}
          onClick={searchBtnClickHandle}
          icon={ViewfinderCircleIcon}
        >
          {' '}
          search{' '}
        </Button>
      </div>

      <Expenses.TableDataDisplay />

      <Expenses.Paginate
        currentPage={searchParams.page}
        setPage={setSearchParams}
      />
    </div>
  );
};

Expenses.TableDataDisplay = () => {
  const { expensesList } = useExpensesStore();
  return (
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Id</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
          <TableHeaderCell>Total Expense</TableHeaderCell>
          <TableHeaderCell>Remaining Expense</TableHeaderCell>
          <TableHeaderCell>IssuedDate</TableHeaderCell>
          {/*<TableHeaderCell>Modify</TableHeaderCell>*/}
        </TableRow>
      </TableHead>
      <TableBody>
        {expensesList.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{expense.id}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>{expense.amount}</TableCell>
            <TableCell>{expense.expenseBudget}</TableCell>
            <TableCell>{expense.remainingExpense}</TableCell>
            <TableCell>{moment(expense.createdAt).format('LLL')}</TableCell>
            {/*<TableCell>
                <Button icon={TrashIcon} color="red">
                  Delete
                </Button>
          </TableCell>*/}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

Expenses.Paginate = ({
  currentPage,
  setPage,
}: {
  currentPage: number;
  setPage: React.Dispatch<
    React.SetStateAction<{
      category: string;
      from: string;
      to: string;
      page: number;
    }>
  >;
}) => {
  const { expensesList, isFetchingExpense } = useExpensesStore();
  const nextClickDisabledCond = expensesList.length !== 10 || isFetchingExpense;
  const prevClickDisabledCond = currentPage <= 1 || isFetchingExpense;

  const onPrevClick = () => {
    setPage((state) => ({ ...state, page: state.page - 1 }));
  };

  const onNextClick = () => {
    if (expensesList.length === 10) {
      setPage((state) => ({ ...state, page: state.page + 1 }));
    }
  };

  return (
    <div className="flex flex-row justify-end py-5 items-center space-x-5">
      <Divider className="h-[1.8px]" />
      <Button
        disabled={prevClickDisabledCond}
        onClick={onPrevClick}
        color="red"
      >
        Prev
      </Button>
      <Text className="font-bold">{currentPage}</Text>
      <Button
        disabled={nextClickDisabledCond}
        onClick={onNextClick}
        color="blue"
      >
        Next
      </Button>
    </div>
  );
};

export default Expenses;
