import 'server-only';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

/**
 * 텍스트 암호화
 * @param text 암호화 텍스트
 */
export const encryptText = (text: string) => {
  const iv = randomBytes(16);
  const key = Buffer.from(process.env.DATA_ENCRYPTION_KEY, 'utf8');
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([
    iv,
    cipher.update(text),
    cipher.final()
  ]).toString('hex');
};

/**
 * 텍스트 복호화
 * @param data 복호화할 데이터
 */
export const decryptText = (data: string) => {
  const buff = Buffer.from(data, 'hex');
  const iv = buff.subarray(0, 16);
  const key = Buffer.from(process.env.DATA_ENCRYPTION_KEY, 'utf8');
  const cipher = createDecipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([
    cipher.update(buff.subarray(16)),
    cipher.final(),
  ]).toString('utf8');
};

/**
 * 복호화 후 JSON 포맷으로 변환합니다.
 * @param data 복호화할 데이터
 */
export const decryptToJson = <D = any>(data: string): D | null => {
  try {
    return JSON.parse(decryptText(data)) as D;
  } catch {
    return null;
  }
};
