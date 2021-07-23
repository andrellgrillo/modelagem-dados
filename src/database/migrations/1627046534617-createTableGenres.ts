import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableGenres1627046534617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_genres" PRIMARY KEY ("id"))',
        );

        await queryRunner.query(
            'CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId"  uuid NOT NULL , "gamesId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_orders" PRIMARY KEY ("id"))'
        );

        await queryRunner.query(
            'ALTER TABLE "games" ADD COLUMN ("genresId uuid ") ',
        );

        await queryRunner.query(
            'ALTER TABLE "games" ADD CONSTRAINT "FK_games_genres" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE',
        );

        await queryRunner.query(
            'ALTER TABLE "orders" ADD CONSTRAINT "FK_orders_users" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE',
        );

        await queryRunner.query(
            'ALTER TABLE "orders" ADD CONSTRAINT "FK_orders_games" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE CASCADE',
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_games"',
        );
        await queryRunner.query(
            'ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_users"',
        );
        await queryRunner.query(
            'ALTER TABLE "games" DROP CONSTRAINT "FK_games_genres"',
        );
        await queryRunner.query('ALTER TABLE "games" DROP COLUMN "genresId"');
        await queryRunner.query('DROP TABLE "orders"');
        await queryRunner.query('DROP TABLE "genres"');
    }

}
