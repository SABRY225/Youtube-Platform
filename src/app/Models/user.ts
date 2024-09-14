export interface User {
    dateOfBirth: string,
    userName: string,
    country: string,
    email: string,
    password: string
}

export interface CurrentUser {
    id:string,
    role: string,
    userName: string,
    country: string,
    email: string,
    profilePicture: string
}

export interface VerifyUser {
    email: string,
    otp: string
}
export interface ResultMessage {
    message: string,
    success: boolean
  }
  
export interface ForgetPassword {
    otp: string,
    email: string,
    newPassword: string
}

export interface SendOTPDate {
    email: string,
}

export interface MessageOTP {
    message: string,
}

export interface UserLogin {
    email: string,
    password: string
}
export interface ResultLogin {
    Token:string,
    Role:string,
    message: string
}