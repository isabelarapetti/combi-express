import crypto from 'crypto';

const encryptMD5 = (value) => {
  const crypted = crypto.createHash('md5').update(value).digest('hex');
  return crypted;
};

export default encryptMD5;
