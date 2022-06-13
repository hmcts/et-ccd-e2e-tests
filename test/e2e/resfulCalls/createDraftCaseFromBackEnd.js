Feature('Create Draft Cases from CCD backend');
const querystring = require('querystring');

const { expect } = require('chai');

const request = require('../../data/request.json');

Scenario('England: create single draft case via api', async ({ I }) => {
  // get idam token
  let url = process.env.IDAM_URL;
  //let url = 'https://idam-api.aat.platform.hmcts.net/loginUser';
  let payload = querystring.stringify({
    // eslint-disable-next-line no-undef
    username: process.env.TEST_CASE_USERNAME,
    // eslint-disable-next-line no-undef
    password: process.env.TEST_CASE_USERNAME,
  });

  let header = { 'Content-Type': 'application/x-www-form-urlencoded' };
  console.log(`${process.env.TEST_CASE_USERNAME}`);
  let res = await I.sendPostRequest(url, payload, header);
  expect(res.status).to.eql(200);
  //use token to make draft application
  await res;
  //console.log (res);
  //let new_url = 'http://et-sya-api-aat.service.core-compute-aat.internal/cases/initiate-case/';
  let new_url = process.env.ET_CASE_API_URL;
  let access_token = res.data.access_token;
  //console.log(access_token);
  let new_header = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
  };
  let new_payload = `${JSON.stringify(request.draft_case_payload)}`;
  console.log(new_payload);
  let result = await I.sendPostRequest(new_url, new_payload, new_header);
  console.log(result);
  expect(result.status).to.eql(200);
  await result;
}).tag('@test');
