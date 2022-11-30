const chai = require('chai')
const chaiHttp = require('chai-http');
const { request, expect } = require('chai');
chai.use(chaiHttp);
var should = chai.should();

const server = require('../server');
const itemController = require('../controllers/itemController');

describe('GET item one /:hash', () => {
  it('sukses mengambil item dengan parameter :has', async () => {
    let randomStr = await itemController.makeid(10);
    chai.request(server)
      .get('/api/item/' + randomStr)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('status');
        expect(response.body.data)
          .should.be.a('object');
      });
  });
});

describe('GET items /', () => {
  it('sukses mengambil semua item', async () => {
    chai.request(server)
      .get('/api/item')
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('data');
      });
  });
});

describe('POST Item', () => {
  it('gagal body pengisian kosong (test function)', () => {
    itemController.createItem()
      .then(() => {
        throw new Error('⚠️ Unexpected success!');
      })
      .catch(err => {
        expect(result).to.be.instanceOf(Error);
        expect(err.message).to.equal('Invalid arguments');
      })
  });

  it('POST / sukses membuat data item (test api)', async () => {
    let hash = await itemController.makeid(10);
    let sampleItemVal = {
      name: 'sample item',
      price: 10,
      rating: '5',
      hash: hash
    };

    chai.request(server)
      .post('/api/item')
      .send(sampleItemVal)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('status');
        expect(response.body.data)
          .should.be.a('object');
        expect(response.body.data)
          .to.have.property('name')
          .to.equal('sample item');
      });
  });
});

describe('update item', () => {
  it('PUT / sukses mengubah data item (test api)', async () => {
    let hash = await itemController.readItems();

    let randomStr = await itemController.makeid(20);
    
    let sampleItemVal = {
      name: randomStr,
      price: Math.floor(Math.random() * 100),
      rating: '5'
    };

    chai.request(server)
      .put('/api/item/'+hash[0].hash)
      .send(sampleItemVal)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('status');
        expect(response.body.data)
          .should.be.a('object');
        expect(response.body.data)
          .to.have.property('name');
      });
  });
});

describe('delete item', () => {
  it('Delete / sukses menghapus data item (test api)', async () => {
    let hash = await itemController.readItems();

    chai.request(server)
      .delete('/api/item/' + hash[0].hash)
      .end((err, response) => {
        expect(response.body).to.have.property('status');
        expect(response.body.data)
          .should.be.a('object');
      });
  });
});