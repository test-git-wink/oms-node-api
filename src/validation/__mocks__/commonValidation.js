export const isVallidDateRange = jest.fn();
isVallidDateRange.mockImplementation((from, to) => {
  if (from == "2020-12-01" && to == "2020-12-31") return true;
  else if (from == "2020-12-01" && to == "2020-10-31") return false;
  else return false;
});

export const isValidNumber = jest.fn();
isValidNumber.mockImplementation((num) => {
  if (num == "10") return true;
  if (num == "1000000000000000000000") return true;
  else if (num == "abc") return false;
  else return false;
});

export const isValidDate = jest.fn();
isValidDate.mockImplementation((date) => {
  if (date == "2020-12-01") return true;
  else if (date == "2020-12-31") return true;
  else if (date == "2020-10-31") return true;
  else return false;
});
