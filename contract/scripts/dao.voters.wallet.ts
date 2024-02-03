import Database from 'better-sqlite3'
import dotenv from 'dotenv';

dotenv.config();

const db = new Database(`${process.env.WORK_DIRECTORY || './'}db.db` /*, { verbose: logger.info } */);  
const daoDb = new Database(`${process.env.WORK_DIRECTORY || './'}dao.db.db` /*, { verbose: logger.info } */);  

async function main() {
    console.log('starting...')
    let stmt = daoDb.prepare(`
    select c.discord_username, 
    (select group_concat(web3_public_key) from accounts a2 where a2.discord_username = c.discord_username) wallets, 
    sum(votes) votes from (
    select * from accounts acc,
    (select 
    user_id, count(distinct poll_id) votes
    from poll_votes p
    group by user_id) b
    where b.user_id = acc.id
    and discord_username is not null) c
    group by c.discord_username
    `)
    let results = stmt.all() as any[]   
    let granted = []

    for (const user of results) {
        /*
        {
            discord_username: 'zonaphil',
            wallets: '0x364da6fc06c67b246086edd0ba5650f420fe10a3',
            votes: 1
        }        
        */
        if (user.votes >= 5) {
            let biggest = null
            let biggestCount = 0
            for (const wallet of user.wallets.split(',')) {
                const owned = getOwnedTokens(wallet)
                if (owned.length > biggestCount) {
                    biggest = wallet
                    biggestCount = owned.length
                } 
            }
            console.log(`${user.discord_username} ${biggest}`)
            granted.push(biggest)
        } else {
            console.log(`-- ${user.discord_username} ${user.votes}`)
        }
    }
}

function getOwnedTokens(wallet: string) {
    wallet = wallet.toLowerCase()
    const sql = `select token_id,
    ceil(JULIANDAY('now') -
    JULIANDAY((select max(tx_date) from events e2 where e2.token_id = a.token_id))) owned_since
    from (select distinct token_id from 
      (select distinct token_id,
      last_value(to_wallet) over ( 
      partition by token_id order by tx_date 
      RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING ) owner
      from events) a
    where lower(a.owner) = @wallet) a`
    const result = db.prepare(sql).all({wallet})
    return result
}

main()