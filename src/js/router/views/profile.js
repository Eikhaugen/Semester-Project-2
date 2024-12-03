import { setLogoutListener } from '../../ui/auth/logout';
import { authGuard } from "../../utils/authGuard";
authGuard();

setLogoutListener();
