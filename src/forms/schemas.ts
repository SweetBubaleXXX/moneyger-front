import moment from 'moment';
import { z } from 'zod';

import { CURRENCY_CODES, TRANSACTION_TYPES } from '../constants';

const CONFIRM_PASSWORD_REFINE_OPTIONS = {
  message: "Passwords don't match",
  path: ['confirmPassword'],
};

export const PasswordField = z.string().min(8, { message: 'Password must contain at least 8 characters' });

export const LoginSchema = z.object({
  username: z
    .string()
    .nonempty('Username is required')
    .regex(/^[\w.@+-]+$/, 'Letters, digits and @/./+/-/_ only')
    .max(150),
  password: PasswordField,
});

export const RegistrationSchema = LoginSchema.extend({
  email: z.string().email(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, CONFIRM_PASSWORD_REFINE_OPTIONS);

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const PasswordResetSchema = z
  .object({
    newPassword: PasswordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, CONFIRM_PASSWORD_REFINE_OPTIONS);

export const ChangePasswordSchema = z
  .object({
    currentPassword: PasswordField,
    newPassword: PasswordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, CONFIRM_PASSWORD_REFINE_OPTIONS);

export const CategoryUpsertSchema = z.object({
  type: z.enum(TRANSACTION_TYPES),
  name: z.string().max(64).nonempty(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  icon: z.string().max(64).default(''),
});

export const SubcategoryCreateSchema = z.object({
  name: z.string().max(64).nonempty(),
});

export const TransactionSchema = z.object({
  amountCents: z.preprocess(Number, z.number().positive().finite()),
  categoryId: z.number().int().positive(),
  currency: z.enum(CURRENCY_CODES),
  timestamp: z.coerce.date().refine((value) => value < moment().toDate(), 'Enter valid date'),
  comment: z.string().max(255),
});
