import { AuthDto } from '../dto/Request/auth.dto';
import { AuthResponseDto } from '../dto/Response/auth-response.dto';

export interface IAuthService {
  login(authDto : AuthDto): Promise<AuthResponseDto>;
  refresh(token: string): Promise<AuthResponseDto>;
}
