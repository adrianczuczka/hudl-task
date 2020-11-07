import TimedCache from './timedCache';

it('puts value into cache and gets value from cache', () => {
  const cache = new TimedCache<string>();

  cache.put('test key', 'test value');

  expect(cache.get('test key')?.value).toBe('test value');
});

it('turns stale after 5 minutes', () => {
  const cache = new TimedCache<string>();

  cache.put('test key', 'test value');
  const now = Date.now();
  Date.now = jest.fn(() => now + 5 * 60 * 1000 * 5); //more than 5 minutes

  expect(cache.get('test key')?.stale()).toBe(true);
});
