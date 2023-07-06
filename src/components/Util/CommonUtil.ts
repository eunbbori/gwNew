export const formatPhoneNumber = (phoneNo: string) => {
  const digits = phoneNo.replace(/\D/g, '');

  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  } else if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else {
    return digits;
  }
};
