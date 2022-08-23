const InMemoryDb = require('./InMemoryDb');

class DbRunner {
    constructor(){
        // this.inMemoryDb = new InMemoryDb();
        this.performOperation.bind(this)
    }
    
    performOperation(input = ''){
        const [command, key, value] = input.split(' ')
        switch(command){
            case 'get': InMemoryDb.get(key); break;
            case 'set': InMemoryDb.set(key, value); break;
            case 'count': InMemoryDb.count(key); break;
            case 'delete': InMemoryDb.delete(key); break;
            case 'commit': InMemoryDb.commit(); break;
            case 'begin': InMemoryDb.begin(); break;
            case 'rollback': InMemoryDb.rollBack(); break;

        }

    }

    run(){
        let stdin = process.openStdin();
        stdin.addListener("data", (d) =>{
            const command = d.toString().trim().toLowerCase()
            this.performOperation(command)
        
        });
    }
}

const runner = new DbRunner();
runner.run()