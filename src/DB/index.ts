import config from '../config';
import { User_Role } from '../modules/User/user.constant';
import { UserModel } from '../modules/User/user.model';

const superUser = {
  id: '0001',
  email: 'syedalamindeveloper@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: User_Role.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await UserModel.findOne({ role: superUser.role });
  if (!isSuperAdminExists) {
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;
