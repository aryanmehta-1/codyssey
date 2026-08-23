export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export function validateSignUp({ name, email, password, confirmPassword }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Enter your full name.';
  if (!email || !isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters.';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

export function validateSignIn({ email, password }) {
  const errors = {};
  if (!email || !isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Enter your password.';
  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
