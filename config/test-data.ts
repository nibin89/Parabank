// 📂 config/test-data.ts
/**
 * Centralized test data for all test cases
 * Avoids hard-coding values in tests
 */
export const TestData = {
    USER: {
      VALID: { username: 'john', password: 'demo' }, // Default test credentials
      INVALID: { username: 'invalid', password: 'wrongpass' }, // For negative testing
    },
    ACCOUNTS: {
      FROM_ACCOUNT: '12345', // Source account for transfers
      TO_ACCOUNT: '54321',  // Destination account
    },
    TRANSFER: {
        VALID_AMOUNT: '100',
        INVALID_AMOUNT: '0',
      },
    BILL_PAYEE: { // Sample bill payment data
      NAME: 'ABC Corp',
      ADDRESS: '123 Street',
      // ...other fields
    },
  };