import HeaderTitle from '../../common/typography/Header';
import SelectField from '../../common/Input/SelectField';
import InputField from '../../common/Input/InputField';
import {
  Button,
  Divider,
  Text,
  Callout,
  DateRangePickerValue,
} from '@tremor/react';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { DateRangePicker } from '@tremor/react';
import { useReminderStore, IReminderData } from '../../store/useReminderStore';
import { BellAlertIcon, BellSnoozeIcon } from '@heroicons/react/24/solid';

const Reminder = () => {
  const {
    fetchReminderData,
    isFetchingReminder,
    reminderData,
    updateReminderData,
    addReminderData,
    deleteReminderData,
  } = useReminderStore();
  const [borrowerName, setBorrowerName] = useState(
    reminderData?.borrowerName || '',
  );
  const [amount, setAmount] = useState(reminderData?.amount || 0);
  const [purpose, setPurpose] = useState(reminderData?.purpose || '');
  const [datevalue, setDateValue] = useState(reminderData?.dateValue || []);

  const [isSubmitting, setSubmitting] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchEmailReminder = async () => {
      if (!reminderData) {
        await fetchReminderData();
      }
    };
    fetchEmailReminder();
  }, []);

  const onDateValueChange = (value: DateRangePickerValue) => {
    const uniqueDate = [...new Set(value.filter((date) => date !== null))];
    setDateValue(
      uniqueDate.map((date) => new Date(`${date}`).toLocaleDateString()),
    );
  };

  const validatedInput = () => {
    if (amount <= 0) {
      toast.error('Loan Amount cannot be 0');
      return false;
    }
    if (!borrowerName || !purpose) {
      toast.error('please enter borrower and purpose field properly');
      return false;
    }
    if (datevalue.length === 0) {
      toast.error('please select date ');
      return false;
    }
    return true;
  };

  const submitReminderHandle = async () => {
    if (validatedInput()) {
      setSubmitting(true);
      if (!reminderData) {
        await addReminderData({
          amount: amount,
          borrowerName: borrowerName,
          purpose: purpose,
          dateValue: datevalue,
        });
        toast.success('added new loan reminder successfully.');
      } else {
        await updateReminderData({
          id: reminderData.id,
          amount: amount,
          borrowerName: borrowerName,
          purpose: purpose,
          dateValue: datevalue,
        });
        toast.success('updated loan reminder successfully');
      }

      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setAmount(0);
    setBorrowerName('');
    setDateValue([]);
    setPurpose('');
  };

  const onDeleteHandle = async () => {
    setDeleting(true);
    try {
      await deleteReminderData(reminderData?.id as string);
      toast.success('deleted successfully !!!');
      resetForm();
    } catch (err) {
      toast.error('something went wrong please try again !!!!');
    } finally {
      setDeleting(false);
    }
  };

  if (isFetchingReminder) {
    return <div>Loading....</div>;
  }

  return (
    <div className="max-w-[600px] mx-auto">
      {reminderData ? (
        <Callout
          icon={BellSnoozeIcon}
          color="green"
          title="You have set your loan reminder"
        >
          you will be notified about your loan at{' '}
          {(reminderData as unknown as IReminderData).dateValue.join(',')}
        </Callout>
      ) : (
        <Callout
          icon={BellAlertIcon}
          color="orange"
          title="No loan reminder set"
        >
          You have not set your loan reminder !! please fill out the form below
          to get notified about your loan payment date
        </Callout>
      )}
      <div className="mb-10">
        <div className="my-5">
          <HeaderTitle title="Loan Reminder" size={24} />
        </div>

        <InputField
          placeholder="Enter the borrowers name"
          value={borrowerName}
          label="Borrowers name"
          onValueChange={(e) => setBorrowerName(e.target.value)}
        />
        <InputField
          label="Amount"
          placeholder="Enter the Loan Amount to pay"
          value={`${amount}`}
          onValueChange={(e) => {
            const amount = parseInt(e.target.value);
            if (!amount) {
              setAmount(0);
            }
            if (!isNaN(amount)) {
              setAmount(amount);
            }
          }}
        />
        <InputField
          label="Purpose"
          placeholder="Enter Loan Purpose"
          value={purpose}
          onValueChange={(e) => {
            setPurpose(e.target.value);
          }}
        />
        <Text className="mb-2 mt-4">Select the date</Text>
        <DateRangePicker
          onValueChange={onDateValueChange}
          minDate={new Date()}
          enableDropdown={false}
        />
        <Text color="red"> {datevalue.join(' to ')}</Text>
        <Button
          loading={isSubmitting}
          onClick={submitReminderHandle}
          className="mt-10"
          color="blue"
        >
          Set loan Reminder
        </Button>
        {reminderData && (
          <div>
            <Button
              loading={isDeleting}
              onClick={onDeleteHandle}
              className="mt-5"
              color="red"
            >
              Delete loan reminder
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminder;
