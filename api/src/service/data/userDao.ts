import { Pool, PoolClient } from 'pg'
import { User } from '../models/user'

/**
 * Data Access Object for all User related queries.
 */
export class UserDao {
  private readonly pool: Pool

  public constructor(pool: Pool) {
    this.pool = pool
  }

  public async getUserByUsername(username: string): Promise<User> {
    const client: PoolClient = await this.pool.connect()

    try {
      console.log('createNewUser')
      const res = await client.query(`SELECT id,username FROM identity WHERE username = $1;`, [
        username
      ])

      if (!res || !res.rows || !res.rows[0]) return null

      const row = res.rows[0]
      const user = new User({
        id: row['id'],
        username: row['username']
      })

      return user
    } finally {
      client.release()
    }
  }
  public async createNewUser(username: string, password: string): Promise<User> {
    const client: PoolClient = await this.pool.connect()

    try {
      console.log('createNewUser')
      const res = await client.query(`
      WITH rows AS (
        INSERT INTO 
        "identity" (username,password)
        VALUES     
        ('${username}', '${password}')
        RETURNING id
      )
      INSERT INTO identity_role (role_id, identity_id)
        SELECT 2,id
        FROM rows
      RETURNING identity_id;`)
      const row = res.rows[0]

      const user = new User({
        id: row['id'],
        username: row['username']
      })

      return user
    } finally {
      client.release()
    }
  }
  public async getUserByIdentityId(id: number): Promise<User> {
    const client: PoolClient = await this.pool.connect()

    try {
      const permissions = await this.getUserPermissions(id)

      const res = await client.query(`SELECT username FROM identity WHERE id = $1;`, [id])
      const row = res.rows[0]

      const user = new User({
        id,
        username: row['username'],
        permissions
      })

      return user
    } finally {
      client.release()
    }
  }

  public async getUserByCredentials(username: string, password: string): Promise<User> {
    const client: PoolClient = await this.pool.connect()

    try {
      const identityId = await this.getIdFromBasicAuth(
        `username = '${username}' AND password = '${password}';`
      )
      if (!identityId) return null
      const output = await this.getUserByIdentityId(identityId)
      return output
    } finally {
      client.release()
    }
  }

  private async getIdFromBasicAuth(condition: string): Promise<any> {
    const client: PoolClient = await this.pool.connect()

    try {
      const res = await client.query(`SELECT id FROM identity WHERE ${condition};`)

      if (!res || !res.rows || !res.rows[0]) return null

      return res.rows[0]['id']
    } finally {
      client.release()
    }
  }

  private async getUserPermissions(identity_id: number): Promise<any> {
    const client: PoolClient = await this.pool.connect()

    try {
      const res = await client.query(
        `select 
        p.code,
        case when uaux.permission_id is null then 0 else 1 END as hasPermission
        from permission P
        left   join (
              select
                rp.permission_id 
                
              from identity_role ir 
              
              inner join role_permission RP
                  on	ir.role_id = rp.role_id
                  
              where ir.identity_id = $1
                
              ) uaux
            on	p.id = uaux.permission_id;`,
        [identity_id]
      )

      if (!res || !res.rows || !res.rows[0]) return null

      const permissions = {}
      res.rows.forEach((row) => {
        permissions[row['code'].toString().toUpperCase()] = row.haspermission == 1
      })

      return permissions
    } finally {
      client.release()
    }
  }
}
