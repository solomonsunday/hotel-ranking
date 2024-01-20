export interface IHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  chainId: number;
}

export interface IHotelChain {
  id: string;
  name: number;
}

export interface ErrorResponse {
  status: number;
  message: string;
  url: string;
}

export interface ErrorContextProps {
  error: ErrorResponse | null;
  setError: (error: ErrorResponse) => void;
  clearError: () => void;
}

export interface IKeywords {
  onSearch: (query: string) => void;
}

export interface ErrorResponse {
  status: number;
  message: string;
  url: string;
}
