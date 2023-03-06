export function isValid(data) {
  if (Object.values(data).includes("")) {
    return false;
  }
  return true;
}
