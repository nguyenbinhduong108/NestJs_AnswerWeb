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
     * hàm tìm kiếm theo id
     * @param id: id cần tìm
     * @returns true nếu tìm thấy, false nếu không tìm thấy
     */
    async findById(id: string): Promise<boolean> {
        try {
            const result = this.accountRepository.findOneBy({
                id: id,
            });

            if (result) {
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            throw new HttpException("Lỗi serve", 500);
        }
    }

    /**
     * hàm đăng nhập
     * @param email: email đăng nhập 
     * @param password: mất khẩu
     * @returns account cần tìm
     * 
     * B1: tìm kiếm trong db 
     * B2: nếu có trả về account cần tìm, nếu không trả về null
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
     * hàm thêm tài khoản (Đăng ký)
     * @param account: account cần thêm gồm (tên đăng nhập, mật khẩu, trạng thái(admin, user))
     * @returns acount được thêm
     * 
     * B1: tìm kiếm trong db
     * B2: nếu chưa tồn tại trong db thì thêm vào và trả về account vừa thêm, nếu có rồi thì trả về null 
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

                return plainToInstance(Account, result, {
                    excludeExtraneousValues: true,
                })
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
     * hàm xoá tài khoản
     * @param id: id tài khoản cần xoá
     * @returns true nếu xoá thành công, false nếu xoá không thành công
     * 
     * B1: tìm kiếm id cần xoá trong db
     * B2: nếu tìm thấy và xoá thành công thì trả về true, nếu tìm thấy và xoá không thành công thì trả về false, nếu không tìm thấy throw exception
     */
    async delete(id: string): Promise<boolean> {
        try {
            const deleteId = await this.findById(id);

            if (deleteId === true) {
                const result = await this.accountRepository.delete({ id: id });
                if (result.affected) {
                    return true;
                }
                else {
                    return false;
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
     * @param id: id của tài khoản cần đổi
     * @param password: mật khẩu mới
     * @returns 
     * 
     * B1: tìm kiếm trong db có tồn tại id cần thay đổi khônh
     * B2: nếu có id và mk mới khác với mk cũ thì cho phép đổi mk, nếu mk mới giống mk cũ thì trả về Error
     *     nếu không có id không trả về false
     */
    async change(id: string, password: string): Promise<boolean> {
        try {
            const changeAccount = await this.accountRepository.findOneBy({ id: id });

            if (changeAccount) {

                if (changeAccount.password === password) {
                    throw new HttpException("Mật khẩu cần khác với mật khẩu trước đó", 500);
                }
                await this.accountRepository.update({ id: id }, { password: password });
                return true;
            }
            else {
                return false;
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
     * hàm quên mật khẩu
     * @param email: email của tài khoản,
     * @param password: password
     * 
     * B1: tìm trong db có email cần tìm không
     * B2: nếu có và mk mới khác mk cũ thì trả về true, nếu mk mới giống mk cũ throw
     *     nếu không tìm thấy trả về false
     */
    async forget(email: string, password: string): Promise<boolean> {
        try {
            const forgetAccount = await this.accountRepository.findOneBy({
                email: email
            })

            if (forgetAccount) {
                if (forgetAccount.password === password) {
                    throw new HttpException("Mật khẩu đã nhập trùng với mật khẩu trước đó", 500);
                }

                await this.accountRepository.update({ email: email }, { password: password });

                return true;
            }
            else {
                return false;
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
     * hàm lấy ra tất cả các account
     * @returns danh sách các account
     */
    async getAll(): Promise<Account[]> {
        const result = await this.accountRepository.find();

        return result;
    }

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