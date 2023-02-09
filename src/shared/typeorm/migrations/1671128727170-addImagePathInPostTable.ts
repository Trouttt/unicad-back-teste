import { MigrationInterface, QueryRunner } from 'typeorm';

export class addImagePathInPostTable1671128727170
  implements MigrationInterface {
  name = 'addImagePathInPostTable1671128727170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "image_path" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "image_path"`);
  }
}
