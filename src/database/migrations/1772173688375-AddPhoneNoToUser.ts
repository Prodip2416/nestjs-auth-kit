import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneNoToUser1772173688375 implements MigrationInterface {
    name = 'AddPhoneNoToUser1772173688375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNo\` varchar(20) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNo\``);
    }

}
