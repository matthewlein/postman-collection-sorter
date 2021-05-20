#!/usr/bin/env node

import fs from 'fs';
import _ from 'lodash';

const args = process.argv.slice(2);
const filePath = args[0];
const outputPath = filePath.replace('.json', '.sorted.json');

console.log('Sorting collection file: ', filePath);

const rawdata = fs.readFileSync(filePath, 'utf8');
const json = JSON.parse(rawdata);

interface PostmanRequest {
  name: string;
  request: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  };
}

const requests = json.item as PostmanRequest[];
const verbMap = {
  GET: 0,
  POST: 1,
  PUT: 2,
  DELETE: 3,
};

const requestsSorted = _.sortBy(requests, (request: PostmanRequest) => {
  return [request.name, verbMap[request.request.method]];
});

const newJson = {
  ...json,
  item: requestsSorted,
};

fs.writeFileSync(
  filePath.replace('.json', '.sorted.json'),
  JSON.stringify(newJson)
);

console.log(`Sorting Successful!\nSorted collection saved to: ${outputPath}`);
