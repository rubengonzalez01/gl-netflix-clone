import { TestBed } from '@angular/core/testing';

import { ApiMovieInterceptor } from './api-movie.interceptor';

describe('ApiMovieInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiMovieInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiMovieInterceptor = TestBed.inject(ApiMovieInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
