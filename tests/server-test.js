const chai = require('chai')
const chaiHttp = require('chai-http');
const { request, expect } = require('chai');
chai.use(chaiHttp);
var should = chai.should();

const server = require('../server');
const itemController = require('../controllers/itemController');

describe('GET /:hash', () => {
  it('gagal mengambil tanpa item dengan parameter :hash', async () => {
    itemController.readItem()
      .then(() => {
        throw new Error('⚠️ Unexpected success!');
      })
      .catch((err) => {
        expect(result).to.be.instanceOf(Error);
        expect(err.message).to.equal('Invalid item id');
      })
  });

  it('sukses mengambil item dengan parameter :has', async () => {
    itemController.readItem('randomId')
      .then((item) => {
        expect(item).to.equal(sampleItemVal);
      })
      .catch((err) => {
        throw new Error('⚠️ Unexpected failure!');
      })
  });
});

describe('POST', () => {
  it('gagal body pengisian kosong', () => {
    itemController.createItem()
      .then(() => {
        throw new Error('⚠️ Unexpected success!');
      })
      .catch(err => {
        expect(result).to.be.instanceOf(Error);
        expect(err.message).to.equal('Invalid arguments');
      })
  });

  it('POST / sukses membuat data item', async () => {
    let hash = await itemController.makeid(10);
    let sampleItemVal = {
      name: 'sample item',
      price: 10,
      rating: '5',
      hash
    };
    chai.request(server)
      .post('/api/item')
      .send(sampleItemVal)
      .end((err, response) => {
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.status(true);
        expect(response.body.data)
          .should.be.a('object');
        expect(response.body.data)
          .to.have.property('name')
          .to.equal('sample item');
      });
  });
});