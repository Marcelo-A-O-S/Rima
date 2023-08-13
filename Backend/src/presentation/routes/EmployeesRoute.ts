import { Router } from "express"
import { EmployeesController } from "../controllers/EmployeesController";

const EmployeesRoute = () => {
    const employeesRoute = Router();
    const employeesController = new EmployeesController();
    employeesRoute.post('/create', employeesController.create);
    employeesRoute.get('/', employeesController.getAll);
    return employeesRoute;
}
export { EmployeesRoute }
