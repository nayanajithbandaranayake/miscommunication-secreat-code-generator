export interface Value {
  login_data: {
    email: string;
    password: string;
  };
  email_error: boolean;
  empty_error: boolean;
  post_error: boolean;
  server_error: boolean;
  updateInputs: (name: string, value: string) => void;
  setClicked: () => void;
  clicked: boolean;
  setError: (error: boolean, type: string) => void;
  validateEmail: (email: string) => void;
  postLoginData: (email: string, password: string) => Promise<void>;
  verifyData: (email: string, password: string) => Promise<void>;
}

export interface LoginInitialState {
  login_data: {
    email: string;
    password: string;
  };
  email_error: boolean;
  empty_error: boolean;
  post_error: boolean;
  server_error: boolean;
  clicked: boolean;
}
