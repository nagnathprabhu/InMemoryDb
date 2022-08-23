//TODO: 
//handle the frequency within transactions
//handle nested transactions
module.exports = {
  records: {},
  frequency: {},
  preTransaction: {},
  get: function (key) {
    console.log(this.records[key] || 'NULL')
  },
  set: function (key, value) {
    this.records[key] = value;
    let frequency = (this.frequency[value] || 0) + 1;
    this.frequency[value] = frequency;
    return;
  },
  delete: function (key) {
    const found = this.records[key];
    const frequency = this.frequency[found];
    if (frequency) {
      this.frequency[found] = frequency - 1;
    }
    delete this.records[key];
  },
  count: function (value) {
    console.log(this.frequency[value] || 0)
  },
  begin: function () {
    this.preTransaction = this.records;
    this.records = {}
    return;
  },
  rollBack: function () {
    if (!Object.keys(this.records).length) {
      console.log('NO TRANSACTION');
      return;
    }
    this.records = this.preTransaction;
    this.preTransaction = {};
    return;
  },
  commit: function () {
    if (!Object.keys(this.records).length) {
      console.log('NO TRANSACTION');
      return;
    }
    Object.keys(this.records).map(record => {
      this.preTransaction[record] = this.records[record];
    })
    this.records = this.preTransaction;
    this.preTransaction = {}
  }

}

