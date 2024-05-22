import bcrypt from "bcrypt";
const saltRounds = 10;
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(`Salt:${salt}`);
    const hash = await bcrypt.hash(password, salt);
    console.log(`Hash:${hash}`);
    return hash;
  } catch (err) {
    console.error(err.message);
  }
};

export const comparePassword = async (plain, hashed) => {
  try {
    const result = await bcrypt.compare(plain, hashed);
    return result;
  } catch (err) {
    console.error("Error comparing password", err);
    return false;
  }
};
