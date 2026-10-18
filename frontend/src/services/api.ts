import type {
  AlbumRecord,
  AvatarRecord,
  AuctionItemRecord,
  DonorRecord,
  AuditLogRecord,
  YearRecord,
  AdminUser
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
const TOKEN_KEY = 'durga_bhavani_admin_token';
const USER_KEY = 'durga_bhavani_admin_user';

export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredAuth = (token: string, user: AdminUser): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearStoredAuth = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

const request = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getStoredToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.error?.message || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    (err as unknown as { code?: string; status?: number }).status = response.status;
    (err as unknown as { code?: string }).code = data?.error?.code;
    throw err;
  }

  return data;
};

export const api = {
  // --- AUTHENTICATION ---
  async login(email: string, password: string): Promise<{ user: AdminUser; token: string }> {
    const res = await request<{ success: boolean; data: { user: AdminUser; token: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    setStoredAuth(res.data.token, res.data.user);
    return res.data;
  },

  async logout(): Promise<void> {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    } finally {
      clearStoredAuth();
    }
  },

  async getCurrentUser(): Promise<AdminUser> {
    const res = await request<{ success: boolean; data: AdminUser }>('/auth/me');
    return res.data;
  },

  // --- PUBLIC DATA (Published Records Only) ---
  async getYears(): Promise<YearRecord[]> {
    const res = await request<{ success: boolean; data: YearRecord[] }>('/years');
    return res.data;
  },

  async getAlbums(year?: number): Promise<AlbumRecord[]> {
    const query = year ? `?year=${year}` : '';
    const res = await request<{ success: boolean; data: AlbumRecord[] }>(`/albums${query}`);
    return res.data;
  },

  async getAlbumBySlug(slug: string): Promise<AlbumRecord> {
    const res = await request<{ success: boolean; data: AlbumRecord }>(`/albums/${slug}`);
    return res.data;
  },

  async getAvatars(year?: number, albumSlug?: string): Promise<AvatarRecord[]> {
    const params = new URLSearchParams();
    if (year) params.append('year', String(year));
    if (albumSlug) params.append('albumSlug', albumSlug);
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await request<{ success: boolean; data: AvatarRecord[] }>(`/avatars${query}`);
    return res.data;
  },

  async getAuctions(year?: number, albumSlug?: string): Promise<AuctionItemRecord[]> {
    const params = new URLSearchParams();
    if (year) params.append('year', String(year));
    if (albumSlug) params.append('albumSlug', albumSlug);
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await request<{ success: boolean; data: AuctionItemRecord[] }>(`/auctions${query}`);
    return res.data;
  },

  async getDonors(year?: number): Promise<DonorRecord[]> {
    const query = year ? `?year=${year}` : '';
    const res = await request<{ success: boolean; data: DonorRecord[] }>(`/donors${query}`);
    return res.data;
  },

  // --- ADMIN CONTENT (Protected by requireAuth) ---
  async getAdminAlbums(): Promise<AlbumRecord[]> {
    const res = await request<{ success: boolean; data: AlbumRecord[] }>('/admin/albums', { requiresAuth: true });
    return res.data;
  },

  async saveAdminAlbum(album: Partial<AlbumRecord> & { id?: string }): Promise<AlbumRecord> {
    if (album.id && !album.id.startsWith('new-')) {
      const res = await request<{ success: boolean; data: AlbumRecord }>(`/admin/albums/${album.id}`, {
        method: 'PATCH',
        body: JSON.stringify(album),
        requiresAuth: true
      });
      return res.data;
    }
    const res = await request<{ success: boolean; data: AlbumRecord }>('/admin/albums', {
      method: 'POST',
      body: JSON.stringify(album),
      requiresAuth: true
    });
    return res.data;
  },

  async deleteAdminAlbum(id: string): Promise<void> {
    await request(`/admin/albums/${id}`, { method: 'DELETE', requiresAuth: true });
  },

  async getAdminAvatars(): Promise<AvatarRecord[]> {
    const res = await request<{ success: boolean; data: AvatarRecord[] }>('/admin/avatars', { requiresAuth: true });
    return res.data;
  },

  async saveAdminAvatar(avatar: Partial<AvatarRecord> & { id?: string }): Promise<AvatarRecord> {
    if (avatar.id && !avatar.id.startsWith('new-')) {
      const res = await request<{ success: boolean; data: AvatarRecord }>(`/admin/avatars/${avatar.id}`, {
        method: 'PATCH',
        body: JSON.stringify(avatar),
        requiresAuth: true
      });
      return res.data;
    }
    const res = await request<{ success: boolean; data: AvatarRecord }>('/admin/avatars', {
      method: 'POST',
      body: JSON.stringify(avatar),
      requiresAuth: true
    });
    return res.data;
  },

  async deleteAdminAvatar(id: string): Promise<void> {
    await request(`/admin/avatars/${id}`, { method: 'DELETE', requiresAuth: true });
  },

  async getAdminAuctions(): Promise<AuctionItemRecord[]> {
    const res = await request<{ success: boolean; data: AuctionItemRecord[] }>('/admin/auctions', { requiresAuth: true });
    return res.data;
  },

  async saveAdminAuction(item: Partial<AuctionItemRecord> & { id?: string }): Promise<AuctionItemRecord> {
    if (item.id && !item.id.startsWith('new-')) {
      const res = await request<{ success: boolean; data: AuctionItemRecord }>(`/admin/auctions/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify(item),
        requiresAuth: true
      });
      return res.data;
    }
    const res = await request<{ success: boolean; data: AuctionItemRecord }>('/admin/auctions', {
      method: 'POST',
      body: JSON.stringify(item),
      requiresAuth: true
    });
    return res.data;
  },

  async deleteAdminAuction(id: string): Promise<void> {
    await request(`/admin/auctions/${id}`, { method: 'DELETE', requiresAuth: true });
  },

  async getAdminDonors(): Promise<DonorRecord[]> {
    const res = await request<{ success: boolean; data: DonorRecord[] }>('/admin/donors', { requiresAuth: true });
    return res.data;
  },

  async saveAdminDonor(donor: Partial<DonorRecord> & { id?: string }): Promise<DonorRecord> {
    if (donor.id && !donor.id.startsWith('new-')) {
      const res = await request<{ success: boolean; data: DonorRecord }>(`/admin/donors/${donor.id}`, {
        method: 'PATCH',
        body: JSON.stringify(donor),
        requiresAuth: true
      });
      return res.data;
    }
    const res = await request<{ success: boolean; data: DonorRecord }>('/admin/donors', {
      method: 'POST',
      body: JSON.stringify(donor),
      requiresAuth: true
    });
    return res.data;
  },

  async deleteAdminDonor(id: string): Promise<void> {
    await request(`/admin/donors/${id}`, { method: 'DELETE', requiresAuth: true });
  },

  async getAdminAuditLogs(): Promise<AuditLogRecord[]> {
    const res = await request<{ success: boolean; data: AuditLogRecord[] }>('/admin/audit-logs', { requiresAuth: true });
    return res.data;
  },

  // --- ONLINE CLOUDINARY MEDIA UPLOAD ---
  async uploadImage(file: File, folder = 'durga-bhavani/celebrations'): Promise<{
    url: string;
    publicId: string;
    width?: number;
    height?: number;
    format?: string;
  }> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const res = await request<{
      success: boolean;
      data: { url: string; publicId: string; width?: number; height?: number; format?: string };
    }>('/admin/media/upload', {
      method: 'POST',
      body: formData,
      requiresAuth: true
    });

    return res.data;
  }
};
