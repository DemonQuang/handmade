import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { LoginDto, AuthResponseData, UserPayload } from '../types/auth.types';

export class AuthService {
  public async login(dto: LoginDto): Promise<AuthResponseData> {
    if (!dto || !dto.email || typeof dto.email !== 'string') {
      throw new Error('Địa chỉ email không được để trống');
    }

    const email = dto.email.trim().toLowerCase();

    // Check basic email format
    if (!email || !email.includes('@')) {
      throw new Error('Địa chỉ email không hợp lệ');
    }

    // 1. Authorization Guard: Check if email is an authorized administrator
    const isAuthorized = ENV.ADMIN_EMAILS.includes(email);
    if (!isAuthorized) {
      throw new Error(`Email "${email}" không có quyền truy cập trang quản trị Luna Studio`);
    }

    // 2. Google one-click authorization
    if (dto.isGoogleAuth) {
      return this.generateToken({
        email,
        displayName: 'Luna Admin',
        role: 'ADMIN',
      });
    }

    // 3. Password verification - strictly check admin password
    if (!dto.password || dto.password !== ENV.ADMIN_PASSWORD) {
      throw new Error('Mật khẩu quản trị không chính xác');
    }

    return this.generateToken({
      email,
      displayName: 'Luna Admin',
      role: 'ADMIN',
    });
  }

  public generateToken(user: UserPayload): AuthResponseData {
    const token = jwt.sign(user, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });

    return { token, user };
  }

  public verifyToken(token: string): UserPayload {
    return jwt.verify(token, ENV.JWT_SECRET) as UserPayload;
  }
}

export const authService = new AuthService();
