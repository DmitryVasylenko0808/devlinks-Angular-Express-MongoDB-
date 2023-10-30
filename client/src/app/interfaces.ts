export interface User {
  _id?: string,
  login?: string,
  password?: string,
  firstName: string,
  secondName: string,
  email?: string,
  avatarFile?: File | string
}

export interface Link {
  platform: string,
  link: string
}
