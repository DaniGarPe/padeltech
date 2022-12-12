import { TestBed } from '@angular/core/testing';

import { NewBlogService } from './new-blog.service';

describe('NewBlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewBlogService = TestBed.get(NewBlogService);
    expect(service).toBeTruthy();
  });
});
