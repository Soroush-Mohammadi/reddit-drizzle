import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address')
});

/**
 * Inferred type (optional but recommended)
 */
export type EmailInput = z.infer<typeof emailSchema>;

// Schema for the verification code
export const verificationCodeSchema = z.object({
  code: z
    .string()
    .length(5, { message: 'Code must be exactly 5 digits' })
    .regex(/^\d{5}$/, { message: 'Code must contain only digits' })
});

// Export the inferred TypeScript type
export type VerificationCodeInput = z.infer<typeof verificationCodeSchema>;

export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    'Only letters, numbers, underscores, and hyphens allowed'
  )
  .refine(
    (val) => !val.startsWith('-') && !val.startsWith('_'),
    'Username cannot start with - or _'
  )
  .refine(
    (val) => !val.endsWith('-') && !val.endsWith('_'),
    'Username cannot end with - or _'
  );

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters');
// Add more rules if needed, e.g.:
// .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number')

export const birthdaySchema = z
  .object({
    month: z
      .string()
      .regex(/^\d{1,2}$/, 'Month must be numeric')
      .transform((val) => parseInt(val))
      .refine(
        (val) => val >= 1 && val <= 12,
        'Month must be between 01 and 12'
      ),

    day: z
      .string()
      .regex(/^\d{1,2}$/, 'Day must be numeric')
      .transform((val) => parseInt(val))
      .refine((val) => val >= 1 && val <= 31, 'Day must be between 01 and 31'),

    year: z
      .string()
      .regex(/^\d{4}$/, 'Year must be 4 digits')
      .transform((val) => parseInt(val))
      .refine(
        (val) => val >= 1900 && val <= new Date().getFullYear(),
        'Please enter a valid year'
      )
  })
  .refine(
    ({ month, day, year }) => {
      // Check if the date is actually valid (e.g., no Feb 30)
      const date = new Date(year, month - 1, day);
      return date.getMonth() + 1 === month && date.getDate() === day;
    },
    { message: 'Invalid date' }
  )
  .refine(
    ({ month, day, year }) => {
      // Minimum age 13 (Reddit policy)
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 13;
    },
    { message: 'You must be at least 13 years old to use Reddit' }
  );

export type BirthdayInput = z.infer<typeof birthdaySchema>;
