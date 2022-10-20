import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LastNumbers extends BaseSchema {
  protected tableName = 'last_numbers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('date_index').unique()
      table.integer('number')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
