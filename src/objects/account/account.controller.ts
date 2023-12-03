import { ImgurService } from '../../shared/uploadImage/imgur.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { AccountService } from "./account.service";
import { ApiTags } from "@nestjs/swagger";
import { AccountDto } from "src/dto/account.dto";

@Controller('account')
@ApiTags('Account')
export class AccountController {

    constructor(private readonly accountService: AccountService) { }

    @Get('Login')
    async login(@Query('email') email: string, @Query('password') password: string, @Res() res) {

        const result = await this.accountService.login(email, password);

        return res.status(HttpStatus.OK).json(result);
    }

    @Post("Register")
    async createAccount(@Body() account: AccountDto, @Res() res) {
        const result = await this.accountService.create(account);

        return res.status(HttpStatus.ACCEPTED).json(result);

    }

    @Put('Change/:accountId')
    async changeAccount(@Param('accountId') accountId: string, @Query('password') password: string, @Res() res) {
        const result = await this.accountService.change(accountId, password);

        return res.status(HttpStatus.OK).json(result);

    }

    @Put('Forget/:email')
    async forgetPassword(@Param('email') email: string, @Query('pasword') pasword: string, @Res() res) {
        const result = await this.accountService.forget(email, pasword);

        return res.status(HttpStatus.OK).json(result);

    }

    @Delete(':accountId')
    async deleteAccount(@Param('accountId') accountId: string, @Res() res) {
        const result = await this.accountService.delete(accountId);

        return res.status(HttpStatus.OK).json(result);
    }

}
