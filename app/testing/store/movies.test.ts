import { createPinia, setActivePinia } from 'pinia';
import { describe, test, expect, beforeEach, vi, type Mock } from 'vitest';
import { useMoviesStore } from '~/store/movies';

describe('Movies Store', () => {
  let fetchMock: Mock;
  let store: ReturnType<typeof useMoviesStore>;
  const token = 'mockToken';

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useMoviesStore();

    fetchMock = vi.fn();
    vi.stubGlobal('$fetch', fetchMock);
  })

  /*
  // Mock data
  */

  const mockResponseWhenSearchingPeak = {
    page: 1,
    results: [
      { id: 1, title: 'Peaky Blinders' },
      { id: 2, title: 'Peak' },
    ],
    total_pages: 2
  };

  const mockResponseWhenSearchingHamn = {
    page: 1,
    results: [
      { id: 3, title: 'Hamnet' },
    ],
    total_pages: 1
  };

  /*
  // Search behavior
  */

  test('it should reset search if the query is different', async () => {
    fetchMock.mockResolvedValue(mockResponseWhenSearchingPeak);
    await store.updateSearchQuery(token, 'peak');
    expect(store.currentSearchPage).toBe(2);
    expect(store.moviesSearch.length).toBe(2);
    
    fetchMock.mockResolvedValue(mockResponseWhenSearchingHamn);
    await store.updateSearchQuery(token, 'hamn');
    expect(store.currentSearchPage).toBe(2);
    expect(store.moviesSearch.length).toBe(1);
  });

  test('it should not search for movies if the query is too short', async () => {
    await store.updateSearchQuery(token, 'a');
    expect(store.moviesSearch.length).toBe(0);
    expect(global.$fetch).not.toHaveBeenCalled();
  });

  test("it should not fetch movies if it's still loading", async () => {
    store.loading = true;
    await store.updateSearchQuery(token, 'search query');
    expect(global.$fetch).not.toHaveBeenCalled();

    await store.fetchNextPageMovies(token);
    expect(global.$fetch).not.toHaveBeenCalled();
  });
});
