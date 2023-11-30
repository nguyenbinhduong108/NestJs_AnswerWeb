import { HttpException, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { Repository } from "typeorm";
import { classToPlain, plainToInstance, plainToClass } from "class-transformer";
import { AccountDto } from "src/dto/account.dto";

@Injectable({
    scope: Scope.REQUEST,
})
export class AccountService {

    constructor(@InjectRepository(Account) private readonly accountRepository: Repository<Account>) { }

    /**
     * Hàm đăng nhập
     * @param email: email đăng nhập 
     * @param password: mất khẩu
     * @returns account cần tìm
     * 
     * B1: Tìm kiếm email đã được đăng ký chưa
     *  - Nếu chưa đăng ký thì throw
     *  - Nếu đăng ký rồi sang B2
     * B2: Kiếm tra mật khẩu
     *  - Nếu sai mật khẩu thì throw
     *  - Nếu đúng thì sang B3
     * B3: Trả về account cần tìm 
     */
    async login(email: string, password: string): Promise<Account> {
        try {
            const result = await this.accountRepository.findOneBy({ email: email });

            if (result) {
                if (result.password === password) {
                    return plainToInstance(Account, result, {
                        excludeExtraneousValues: true,
                    });
                }
                else {
                    throw new HttpException("Mật khẩu sai", 500);
                }
            }
            else {
                throw new HttpException("Email này chưa được đăng ký tài khoản", 500);
            }

        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            else{
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * Hàm thêm account (Đăng ký)
     * @param account: account cần thêm gồm (tên đăng nhập, mật khẩu, trạng thái(admin, user))
     * @returns acount được thêm
     * 
     * B1: Tìm kiếm email đã được đăng ký chưa
     *  - Nếu đăng ký rồi thì throw
     *  - Nếu chưa đăng ký sang B2
     * B2: Validate dữ liệu
     *  - Avatar: Nếu avatar không hợp lệ thì sử dụng avatar mặc định
     * B3: Thêm account vào db
     *  - Nếu thêm không thành công thì thromw
     *  - Nếu thêm thành công thì sang B4
     * B4: Trả về account vừa thêm
     */
    async create(account: AccountDto): Promise<Account> {
        try {

            const createAccount = await this.accountRepository.findOneBy({
                email: account.email,
            });
            if (!createAccount) {

                if (account.avatar === "" || account.avatar === null || account.avatar === undefined) {
                    account.avatar = 'https://i.imgur.com/t9Y4WFN.jpg';
                }

                const result = await this.accountRepository.save(account);

                if(result){
                    return plainToInstance(Account, result, {
                        excludeExtraneousValues: true,
                    })
                }
                else{
                    throw new HttpException("Đăng ký không thành công", 500);
                }
            }
            else {
                throw new HttpException("Tài khoản đã tồn tại", 500);
            }
        }
        catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi serve", 500);
            }
        }
    }

    /**
     * Hàm xoá account
     * @param accountId: id của account cần xoá
     * @returns true 
     * 
     * B1: Tìm kiếm account cần xoá
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy sang B2
     * B2: Xoá account
     *  - Nếu xoá không thành công thì throw
     *  - Nếu xoá thành công thì sang B3
     * B3: Trả về true
     */
    async delete(accountId: string): Promise<boolean> {
        try {
            const deleteAccount  = await this.accountRepository.findOneBy({ id: accountId });

            if (deleteAccount) {
                const result = await this.accountRepository.delete({ id: accountId });
                if (result.affected) {
                    return true;
                }
                else {
                    throw new HttpException("Xoá không thành công", 500);
                }
            }
            else {
                throw new HttpException("Không tìm thấy tài khoản cần xoá", 404);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error
            }
            else {
                throw new HttpException("Lỗi server", 500);

            }
        }
    }

    /**
     * hàm đổi mật khẩu
     * @param accountId: id của account cần đổi
     * @param password: mật khẩu mới
     * @returns account vừa cập nhật
     * 
     * B1: Tìm kiếm account cần đổi mật khẩu
     *  - Nếu không tìm thấy throw
     *  - Nếu tìm thấy sang B2
     * B2: Kiểm tra mật khẩu
     *  - Nếu mật khẩu giống với mật khẩu hiện tại thì throw
     *  - Nếu mật khẩu khác với mật khẩu hiện tại sang B3
     * B3: Cập nhật mật khẩu
     *  - Nếu cập nhật không thành công thì throw
     *  - Nếu cập nhật thành công thì sang B4
     * B4: Trả về Account của cập nhật
     */
    async change(accountId: string, password: string): Promise<Account> {
        try {
            const changeAccount = await this.accountRepository.findOneBy({ id: accountId });

            if (changeAccount) {

                if (changeAccount.password === password) {
                    throw new HttpException("Mật khẩu cần khác với mật khẩu trước đó", 500);
                }

                const result = await this.accountRepository.update({ id: accountId }, { password: password })

                if(result.affected){
                    return plainToInstance(Account, await this.accountRepository.findOneBy({id: accountId}),{
                        excludeExtraneousValues: true
                    });
                }
                else{
                    throw new HttpException("Cập nhật mật khẩu không thàng công",500);
                }
            }
            else {
                throw new HttpException("Không tìm thấy tài khoản cần đổi mật khẩu", 404)
            }

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi serve", 500);
            }
        }
    }

    /**
     * Hàm quên mật khẩu
     * @param email: email của account cần đổi
     * @param password: mật khẩu mới
     * 
     * B1: Tìm kiếm email account cần đổi mật khẩu
     *  - Nếu không tìm thấy throw
     *  - Nếu tìm thấy sang B2
     * B2: Kiểm tra mật khẩu
     *  - Nếu mật khẩu giống với mật khẩu hiện tại thì throw
     *  - Nếu mật khẩu khác với mật khẩu hiện tại sang B3
     * B3: Cập nhật mật khẩu
     *  - Nếu cập nhật không thành công thì throw
     *  - Nếu cập nhật thành công thì sang B4
     * B4: Trả về Account của cập nhật
     */
    async forget(email: string, password: string): Promise<Account> {
        try {
            const forgetAccount = await this.accountRepository.findOneBy({
                email: email
            })

            if (forgetAccount) {
                if (forgetAccount.password === password) {
                    throw new HttpException("Mật khẩu đã nhập trùng với mật khẩu trước đó", 500);
                }

                const result = await this.accountRepository.update({ email: email }, { password: password });
                
                if(result.affected){
                    return plainToInstance(Account, await this.accountRepository.findOneBy({email: email}),{
                        excludeExtraneousValues: true
                    });
                }
                else{
                    throw new HttpException("Cập nhật mật khẩu không thàng công",500);
                }
            }
            else {
                throw new HttpException("Không tìm thấy email cần đổi mật khẩu", 404)
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi serve", 500);
            }
        }
    }

    /**
     * Hàm lấy 1 account
     * @returns account
     */
    async getOne(id): Promise<Account> {
        const result = await this.accountRepository.findOneBy({ id: id });

        if (result) {
            return plainToInstance(Account, result, {
                excludeExtraneousValues: true,
            });
        }

        else {
            return null;
        }
    }

}