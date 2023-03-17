export interface IDataFormLogin {
  email: string;
  password: string;
}

export interface IFormRegister {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar: string;
  province_id: string | number;
  district_id: string | number;
  address: string;
}

export interface IFormUserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  province_id: string | number;
  district_id: string | number;
  address: string;
}

export type TRegisterAccountResponse = {
  success: number;
  data: IFormRegister;
};
