import { defineRule, configure } from 'vee-validate';
import { required, email, min, numeric } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

// Define global rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('numeric', numeric);

// Custom rule for phone number
defineRule('phone', (value) => {
  if (!value || !value.length) {
    return true;
  }
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(value)) {
    return 'Phone number must be 10 digits';
  }
  return true;
});

// Custom rule for password strength
defineRule('strongPassword', (value) => {
  if (!value || !value.length) {
    return true;
  }
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!strongPasswordRegex.test(value)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  return true;
});

// Configure VeeValidate
configure({
  generateMessage: localize('en', {
    messages: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      min: 'This field must be at least {length} characters',
      numeric: 'This field must be a number',
      phone: 'Phone number must be 10 digits',
      strongPassword: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    },
  }),
});

export function setupVeeValidate() {}