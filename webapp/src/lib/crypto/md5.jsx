import crypto from 'crypto';

export const md5 = (value) => {
  const crypted = crypto.createHash('md5').update(value).digest('hex');
  return crypted;
};
