import "@testing-library/jest-dom"; // Adds custom matchers for testing DOM elements with Testing Library

// Mock the matchMedia API for environments that don't support it (e.g., jsdom)
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false, // Default behavior: no media queries match
    media: query,
    onchange: null,
    addEventListener: vi.fn(), // Modern event listener mocks
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    addListener: vi.fn(), // Legacy method, still mocked for backwards compatibility
    removeListener: vi.fn(),
  }));
}

// Add other global utilities or mocks if needed
// For example, mocking fetch or localStorage:
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// Add any other utilities or setup logic here as your application grows
