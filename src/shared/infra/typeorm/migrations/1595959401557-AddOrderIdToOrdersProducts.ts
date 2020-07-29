import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { Query } from 'typeorm/driver/Query';

export default class AddOrderIdToOrdersProducts1595959401557
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products',
      new TableColumn({
        name: 'order_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'OrdersProductOrder',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductOrder');

    await queryRunner.dropColumn('orders_products', 'order_id');
  }
}
