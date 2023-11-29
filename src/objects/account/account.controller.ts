import { ImgurService } from '../../shared/uploadImage/imgur.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { AccountService } from "./account.service";
import { ApiTags } from "@nestjs/swagger";
import { AccountDto } from "src/dto/account.dto";

@Controller('account')
@ApiTags('Account')
export class AccountController {

    constructor(
        private readonly accountService: AccountService,
    ) { }


    // @Get('GetAll')
    // async getAll() {
    //     return await this.accountService.getAll();
    // }

    @Get('GetOne/:id')
    async getOne(@Param('id') id: string, @Res() res) {
        const result = await this.accountService.getOne(id);

        if (result) {
            return res.status(HttpStatus.OK).json(result);
        }

        else {
            return res.status(HttpStatus.NOT_FOUND).json(null);
        }
    }

    @Get('Login')
    async login(@Query('email') email: string, @Query('password') password: string, @Res() res) {

        const result = await this.accountService.login(email, password);

        return res.status(HttpStatus.OK).json(result)
    }

    @Post("/Create")
    async createAccount(@Body() account: AccountDto) {
        const result = await this.accountService.create(account);

        return result;
    }

    @Put('Change/:id')
    async changeAccount(@Param('id') id: string, @Query('password') password: string) {
        const result = await this.accountService.change(id, password);

        return result;
    }

    @Put('Forget/:email')
    async forgetPassword(@Param('email') email: string, @Query('pasword') pasword: string) {
        const result = await this.accountService.forget(email, pasword);

        return result;
    }

    @Delete(':id')
    async deleteAccount(@Param('id') id: string) {
        return await this.accountService.delete(id);
    }

}
