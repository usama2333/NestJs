import { IsNotEmpty, IsString, IsEmail, IsEnum } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'Vaild role required'
    })
    role: 'INTERN'  | 'ENGINEER' | 'ADMIN'
}
