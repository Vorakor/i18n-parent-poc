import { TestBed } from '@angular/core/testing';

import { TranslationVerificationService } from './translation-verification.service';

describe('TranslationVerificationService', () => {
  let service: TranslationVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
