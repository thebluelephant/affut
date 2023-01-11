exports.capitalize = (value) => {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}