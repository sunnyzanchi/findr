const ora = require('ora')
const dbName = process.env.NODE_ENV === 'test' ? 'scavengeTest' : 'scavenge'
const r = require('rethinkdbdash')({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
})

const pause = time => new Promise(resolve => setTimeout(resolve, time))

const spinner = ora('Setting up db').start()
r.dbList()
  .run()
  .then(dbList => dbList.includes(dbName))
  .then(async includes => {
    if (includes) {
      spinner.text = `Database ${dbName} already exists, dropping!`

      if (!dbName.toLowerCase().includes('test')) {
        // Give the user a change to panic kill if they didn't realize this was destructive
        // But if it's running for tests, we don't care
        await pause(2500)
      }
      return r.dbDrop(dbName).run()
    }
  })
  .then(() => {
    spinner.text = `Creating database '${dbName}'`
    return r.dbCreate(dbName).run()
  })
  .then(() =>
    Promise.all([
      r.db(dbName).tableCreate('games').run(),
      r.db(dbName).tableCreate('lists').run(),
      r.db(dbName).tableCreate('sessions').run(),
      r.db(dbName).tableCreate('users').run(),
    ])
  )
  .then(() => spinner.succeed('Database setup successful'))
  .then(() => {
    if (!process.env.NODE_ENV === 'test') {
      return
    }
    spinner.text = 'Setting up test database data'
    const data = require('../testUtils/data.json')

    return Promise.all(
      Object.keys(data).map(key => r.db(dbName).table(key).insert(data[key]))
    ).then(() => spinner.succeed('Test data loaded'))
  })
  .then(() => r.getPoolMaster().drain())
  .catch(err => {
    spinner.fail('Unable to set up db, see error below')
    r.getPoolMaster().drain()
    throw err
  })
