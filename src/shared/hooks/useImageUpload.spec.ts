import { renderHook, act, waitFor } from '@testing-library/react';
import { useImageUpload } from './useImageUpload';
import { api } from '@/libs/api';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

// Mock the API
vi.mock('@/libs/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('useImageUpload', () => {
  let createObjectURLMock: ReturnType<typeof vi.fn>;
  let revokeObjectURLMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset defaults
    vi.clearAllMocks();

    // Mock URL functions
    createObjectURLMock = vi.fn(() => 'blob:http://localhost/fake-uuid');
    revokeObjectURLMock = vi.fn();
    global.URL.createObjectURL = createObjectURLMock as unknown as typeof global.URL.createObjectURL;
    global.URL.revokeObjectURL = revokeObjectURLMock as unknown as typeof global.URL.revokeObjectURL;
  });

  it('should initialize with default states', () => {
    const { result } = renderHook(() => useImageUpload());

    expect(result.current.imageFile).toBeNull();
    expect(result.current.imagePreview).toBeUndefined();
    expect(result.current.isUploading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should initialize with provided initialImage', () => {
    const { result } = renderHook(() => useImageUpload({ initialImage: 'http://example.com/initial.jpg' }));

    expect(result.current.imagePreview).toBe('http://example.com/initial.jpg');
  });

  it('should handle image selection without API upload', async () => {
    const { result } = renderHook(() => useImageUpload());
    const fakeFile = new File(['dummy content'], 'test.png', { type: 'image/png' });

    act(() => {
      result.current.handleImageSelect(fakeFile);
    });

    expect(createObjectURLMock).toHaveBeenCalledWith(fakeFile);
    expect(result.current.imageFile).toEqual(fakeFile);
    expect(result.current.imagePreview).toBe('blob:http://localhost/fake-uuid');
    expect(result.current.isUploading).toBe(false);
    expect(api.post).not.toHaveBeenCalled();
  });

  it('should handle image selection with API upload successfully', async () => {
    const onUploadSuccessMock = vi.fn();
    const fakeFile = new File(['dummy content'], 'avatar.png', { type: 'image/png' });

    (api.post as Mock).mockResolvedValueOnce({
      data: { url: 'http://example.com/uploaded.jpg' },
    });

    const { result } = renderHook(() =>
      useImageUpload({
        uploadApiRoute: '/uploadImage',
        onUploadSuccess: onUploadSuccessMock,
      }),
    );

    act(() => {
      result.current.handleImageSelect(fakeFile);
    });

    expect(result.current.isUploading).toBe(true);

    await waitFor(() => {
      expect(result.current.isUploading).toBe(false);
    });

    expect(api.post).toHaveBeenCalledWith('/uploadImage', expect.any(FormData));
    expect(onUploadSuccessMock).toHaveBeenCalledWith('http://example.com/uploaded.jpg');
    expect(result.current.error).toBeNull();
  });

  it('should handle API upload failure gracefully', async () => {
    const fakeFile = new File(['dummy content'], 'avatar.png', { type: 'image/png' });

    (api.post as Mock).mockRejectedValueOnce(new Error('Upload failed'));

    const { result } = renderHook(() =>
      useImageUpload({
        uploadApiRoute: '/uploadImage',
      }),
    );

    act(() => {
      result.current.handleImageSelect(fakeFile);
    });

    await waitFor(() => {
      expect(result.current.isUploading).toBe(false);
    });

    expect(result.current.error).toBe('Erro ao fazer upload da imagem');
  });

  it('should handle image removal and trigger complete callback', () => {
    const onRemoveCompleteMock = vi.fn();
    const { result } = renderHook(() =>
      useImageUpload({
        initialImage: 'http://example.com/photo.jpg',
        onRemoveComplete: onRemoveCompleteMock,
      }),
    );

    act(() => {
      result.current.handleImageRemove();
    });

    expect(result.current.imageFile).toBeNull();
    expect(result.current.imagePreview).toBeUndefined();
    expect(onRemoveCompleteMock).toHaveBeenCalled();
  });

  it('should revoke blob URL on unmount', () => {
    const { result, unmount } = renderHook(() => useImageUpload());
    const fakeFile = new File([''], 'test.jpg', { type: 'image/jpeg' });

    act(() => {
      result.current.handleImageSelect(fakeFile);
    });

    expect(result.current.imagePreview).toBe('blob:http://localhost/fake-uuid');

    unmount();

    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:http://localhost/fake-uuid');
  });
});
