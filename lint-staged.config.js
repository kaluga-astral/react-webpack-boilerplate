module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [
    'npm run lint',
    'npm run lint:styles',
    () => 'npm run lint:types',
  ],
};
