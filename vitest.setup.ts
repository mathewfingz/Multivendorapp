import '@testing-library/jest-dom';
import { server } from './src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// JSDOM polyfills
// eslint-disable-next-line @typescript-eslint/no-empty-function
// @ts-ignore
window.alert = () => {};

// Mock next-auth/react to avoid real network calls
vi.mock('next-auth/react', async () => {
  return {
    signIn: vi.fn(async () => ({ ok: true })),
    signOut: vi.fn(async () => ({})),
    useSession: () => ({ data: null, status: 'unauthenticated' as const }),
  };
});

