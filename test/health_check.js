//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();

let server = require('../index');
chai.use(chaiHttp);
/* Test the /GET route
*/
describe('/GET server_statue_check', () => {
    it('it should GET setver status', (done) => {
      chai.request(server)
          .get('/healtcheck')
          .end((err, res) => {
            //console.log(res.body)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.success.should.be.eql(true);
                res.body.message.should.be.eql('db connection success server running');
            done();
          });
    });
});