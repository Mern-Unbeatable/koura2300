import {
  __resetPostedMediaStoreForTests,
  buildPostedMediaKey,
  getPostedMediaSync,
  isPostedMediaKey,
  putPostedMedia,
  resolvePostedMediaUrl,
  POSTED_MEDIA_DEFAULT_IMAGE,
} from '../postedMediaStore';

describe('postedMediaStore', () => {
  beforeEach(() => {
    __resetPostedMediaStoreForTests();
  });

  it('builds media keys and resolves cached payloads', async () => {
    const key = buildPostedMediaKey('posted-1', 'banner');
    expect(isPostedMediaKey(key)).toBe(true);

    await putPostedMedia(key, 'data:image/png;base64,AA');

    expect(getPostedMediaSync(key)).toBe('data:image/png;base64,AA');
    expect(resolvePostedMediaUrl(key)).toBe('data:image/png;base64,AA');
    expect(resolvePostedMediaUrl('missing-key')).toBe('missing-key');
    expect(resolvePostedMediaUrl('')).toBe(POSTED_MEDIA_DEFAULT_IMAGE);
  });
});
