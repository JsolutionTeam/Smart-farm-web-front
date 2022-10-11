const today = new Date();

// 한 달 전
// 오늘 날짜를 기준으로 한 달 전 00시 00분 00초
export function getPrevMonth() {
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate(),
  );

  return startDate;
}

// 00시 00분 00초
export function setStartDate(date?: Date) {
  const standard = date ?? today;
  const startDate = new Date(
    standard.getFullYear(),
    standard.getMonth(),
    standard.getDate(),
    0,
    0,
    0,
  );

  return startDate;
}

// 23시 59분 59초
export function setEndDate(date?: Date) {
  const standard = date ?? today;

  const endDate = new Date(
    standard.getFullYear(),
    standard.getMonth(),
    standard.getDate(),
    23,
    59,
    59,
  );

  return endDate;
}
