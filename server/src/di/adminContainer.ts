import { AdminController } from "../controllers/admin/adminController";
import { AdminService } from "../services/admin/adminService";
import { AdminRepository } from "../repositories/admin/adminRepository";

const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
export const adminController = new AdminController(adminService);