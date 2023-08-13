import { Router } from "express"
import {RolesController} from "../controllers/RolesController"
import { RolesServices } from "../../services/RolesServices"

const RolesRoute = () => {
    const rolesRoute = Router();
    const rolesController = new RolesController();
    rolesRoute.get('/', rolesController.getAll);
    rolesRoute.post('/create', rolesController.create);
    rolesRoute.post('/UpdateRole', rolesController.update);
    rolesRoute.post('/getByRoleName', rolesController.getByRoleName);
    return rolesRoute;
}
export { RolesRoute }
