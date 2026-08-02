import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Usuario | null> {
    const user = await this.usuariosRepo.findOne({ where: { email } });
    if (!user) return null;
    const match = await bcrypt.compare(password, user.hashContrasena);
    return match ? user : null;
  }

  login(user: Usuario) {
    const payload = { sub: user.id, email: user.email, rol: user.rol };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nombreCompleto: user.nombreCompleto,
        email: user.email,
        rol: user.rol,
      },
    };
  }
}
