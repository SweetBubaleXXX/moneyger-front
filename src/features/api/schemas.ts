import moment from 'moment';
import { z } from 'zod';

import { CURRENCY_CODES, TRANSACTION_TYPES } from '../../constants';

const CONFIRM_PASSWORD_REFINE_OPTIONS = {
  message: "Passwords don't match",
  path: ['confirmPassword'],
};

export const PasswordField = z.string()
  .min(8, { message: 'Password must contain at least 8 characters' });

export const LoginSchema = z.object({
  username: z.string()
    .nonempty('Username is required')
    .regex(/^[\w.@+-]+$/, 'Letters, digits and @/./+/-/_ only')
    .max(150),
  password: PasswordField,
});

export const RegistrationSchema = LoginSchema.extend({
  email: z.string().email(),
  confirmPassword: z.string(),
}).refine(
  data => data.password === data.confirmPassword,
  CONFIRM_PASSWORD_REFINE_OPTIONS
);

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const ChangePasswordSchema = z.object({
  currentPassword: PasswordField,
  newPassword: PasswordField,
  confirmPassword: z.string(),
}).refine(
  data => data.newPassword === data.confirmPassword,
  CONFIRM_PASSWORD_REFINE_OPTIONS
);

export const BaseCategorySchema = z.object({
  name: z.string().max(64).nonempty(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  icon: z.string().max(64).default(''),
});

export const CategoryCreateSchema = BaseCategorySchema.extend({
  transactionType: z.enum(TRANSACTION_TYPES),
});

export const TransactionSchema = z.object({
  amount: z.preprocess(Number, z.number().positive().finite()),
  category: z.number().int().positive(),
  currency: z.enum(CURRENCY_CODES),
  transactionTime: z.coerce.date().refine(
    value => value < moment().toDate(),
    'Enter valid date'
  ),
  comment: z.string().max(255).optional(),
});
