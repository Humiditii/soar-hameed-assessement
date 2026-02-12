import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role, JwtPayloadI } from "../interface/main.interface";
import { ROLES_KEY } from "../decorator/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const user: JwtPayloadI = req.user;

        if (!user || !user.userRole) {
            return false;
        }

        return requiredRoles.some(role => role === user.userRole);
    }
}
