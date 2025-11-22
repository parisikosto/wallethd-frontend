export interface Settings {
  _id: string;
  createdAt: string;
  defaultCurrency: string;
  firstDayOfMonth: number;
  locale: string;
  showDeletedMedia: boolean;
  updatedAt: string;
  user: string;
}

export interface UpdateSettingsReqData {
  defaultCurrency?: string;
  firstDayOfMonth?: number;
  locale?: string;
  showDeletedMedia?: boolean;
}
