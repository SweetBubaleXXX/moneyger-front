export const TRANSACTION_TYPES = ['IN', 'OUT'] as const;

export const CURRENCY_CODES = ['USD', 'EUR', 'RUB', 'BYN'] as const;

export const DATE_INPUT_FORMAT = 'YYYY-MM-DD';

export const DATETIME_INPUT_FORMAT = 'YYYY-MM-DDTHH:mm';

export const PRESET_CATEGORIES = [
  {
    'transaction_type': 'IN',
    'name': 'Category 1',
    'display_order': 1,
    'icon': 'default',
    'color': '#123456',
    'subcategories': [
      {
        'transaction_type': 'IN',
        'name': 'Subcategory 1',
        'display_order': 1,
        'icon': 'default',
        'color': '#123456',
        'subcategories': [
          {
            'transaction_type': 'IN',
            'name': 'Subcategory 1.1',
            'display_order': 1,
            'icon': 'default',
            'color': '#123456',
            'subcategories': [],
            'transactions': [],
          },
          {
            'transaction_type': 'IN',
            'name': 'Subcategory 1.2',
            'display_order': 2,
            'icon': 'default',
            'color': '#123456',
            'subcategories': [],
            'transactions': [],
          },
          {
            'transaction_type': 'IN',
            'name': 'Subcategory 1.3',
            'display_order': 3,
            'icon': 'default',
            'color': '#123456',
            'subcategories': [],
            'transactions': [],
          },
        ],
        'transactions': [],
      },
      {
        'transaction_type': 'IN',
        'name': 'Subcategory 2',
        'display_order': 2,
        'icon': 'default',
        'color': '#123456',
        'subcategories': [],
        'transactions': [],
      },
      {
        'transaction_type': 'IN',
        'name': 'Subcategory 3',
        'display_order': 3,
        'icon': 'default',
        'color': '#123456',
        'subcategories': [],
        'transactions': [],
      },
    ],
    'transactions': [],
  },
  {
    'transaction_type': 'OUT',
    'name': 'Category 2',
    'display_order': 1,
    'icon': 'default',
    'color': '#123456',
    'subcategories': [],
    'transactions': [],
  },
];