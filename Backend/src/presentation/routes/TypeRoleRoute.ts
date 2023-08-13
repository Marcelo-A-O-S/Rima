import { Router } from "express";
import { TypesRolesController } from "../controllers/TypesRolesController"

const TypeRoleRoute = () => {
    const typeRoleRoute = Router();
    const typesRolesController = new TypesRolesController();
    typeRoleRoute.post('/create', typesRolesController.create);
    typeRoleRoute.get('/',typesRolesController.getAll);
    typeRoleRoute.post('/GetByTypeName', typesRolesController.GetByTypeName);
    return typeRoleRoute
}
export { TypeRoleRoute }
