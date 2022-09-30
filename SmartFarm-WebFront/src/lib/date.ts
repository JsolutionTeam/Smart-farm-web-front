const today = new Date();

// 시작일
export function getStartDate() {
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate(),
  );

  return startDate;
}

// 종료일
export function getEndDate() {
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
  );

  return endDate;
}

export function setStartDate(date: Date) {
  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
  );

  return startDate;
}

export function setEndDate(date: Date) {
  const endDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
  );

  return endDate;
}
