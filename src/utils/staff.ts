import { StaffRole } from '~/models/staff'

export function getRoleDisplayName(role: StaffRole): string {
  switch (role) {
    case StaffRole.SuperAdmin:
      return 'Quản trị viên'
    case StaffRole.Admin:
      return 'Quản lý'
    case StaffRole.User:
      return 'Nhân viên'
    default:
      return 'Không rõ'
  }
}
