import { Body, Controller, Delete, Get, Param, Patch, Post, Query ,ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // /users    its a route path define in decorator
export class UsersController {
    // this is how we can create a instance of a class
    // const usersService = new usersService(); 

    // but next js handle this line of code for us is easy way
    // here we are also just creating a instance of the UserService class
    constructor(private readonly usersService: UsersService) {}


    @Get() // /users  ||  http://localhost:3000/users?role=ADMIN
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }

    // @Get('interns')  //  /users/interns
    // findAllInterns() {
    //     return []
    // }

    @Get(':id') // /users/:id
    // findOne(@Param('id') id: string) {
        findOne(@Param('id',ParseIntPipe) id: number) {
        // return this.usersService.findOne(+id); // + sign converts string into number
        return this.usersService.findOne(id); // when using ParseIntPie then no need to add + sign bcz ParseIntPipe handle this
    }

    @Post() //    /users   also send data in body
    // create(@Body() user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    //     return this.usersService.create(user)
    // }
    // need to use ValidationPipe for DTO class validator like isString() NotEmpty()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Patch(':id') //   /users/:id   also send data in body
    // update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: {name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
    //     return this.usersService.update(id, userUpdate)
    // }
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') // /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }



}
