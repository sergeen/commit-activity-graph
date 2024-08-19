import { ReactNode } from 'react';

export interface CommitActivity {
  total: number;
  week: number;  // Unix timestamp
  days: number[];
}

// individual day data.
export interface DayData {
  date: Date | number;
  value: number;
}

export interface D3ChartProps {
  data: CommitActivity[];
}

export interface CommitActivityContextProps {
  data: CommitActivity[];
  loading: boolean;
}

export interface CommitActivityContextProviderProps {
  children: ReactNode;
}
