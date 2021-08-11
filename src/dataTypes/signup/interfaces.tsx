export interface Value {
  signup_data: SignupData;
  username_error: boolean;
  email_error: boolean;
  password_error: boolean;
  confirm_error: boolean;
  empty_error: boolean;
  server_error: boolean;
  clicked: boolean;
  username_post_error: boolean;
  email_post_error: boolean;
  post_error: boolean;
  setClicked: () => void;
  validateEmail: (value: string) => void;
  validateUsername: (value: string) => void;
  validatePassword: (value: string) => void;
  validateConfirm: (value: string) => void;
  setError: (type: string, error: boolean) => void;
  updateInputs: (name: string, value: string) => void;
  verifyData: (username: string, email: string) => Promise<void>;
  postData: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupInitialState {
  signup_data: SignupData;
  username_error: boolean;
  email_error: boolean;
  password_error: boolean;
  confirm_error: boolean;
  empty_error: boolean;
  post_error: boolean;
  server_error: boolean;
  clicked: boolean;
  username_post_error: boolean;
  email_post_error: boolean;
}
