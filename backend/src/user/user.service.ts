import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<{ user: User; token: string }> {
    const hashedPassword = await this.hashPassword(data.password);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const payload = { userId: user.id, email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    return { user, token };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return hash(password, saltOrRounds);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.findByEmail(email);
    if (!user || !(await this.comparePasswords(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(plainTextPassword, hashedPassword);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
