var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();  chai.use(chaiHttp);

describe('Achievements', function() {
  it('should get achievements on a particular date on api/achievements/<date> GET');
  it('should get achievements of a particular Staff on date on api/achievements/<id>/<date> GET');
});