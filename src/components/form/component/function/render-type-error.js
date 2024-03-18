export const renderTypeError = (label, error) => {
  if (error && error.message) {
    return error.message;
  }
  switch (error.type) {
    case 'required':
      return `โปรดระบุ ${label}`;
    case 'pattern':
      return `รูปแบบไม่ถูกต้อง`;
    case 'maxLength':
      return `ระบุไม่เกิน ${error.message} ตัวอักษร`;
    case 'max':
      return `ระบุจำนวนไม่เกิน ${error.message} ตัวอักษร`;
    case 'minLength':
      return `ระบุไม่น้อยกว่า ${error.message} ตัวอักษร`;
    case 'min':
      return `ระบุไม่น้อยกว่า ${error.message} ตัวอักษร`;
  }
};
