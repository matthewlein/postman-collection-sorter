#!/usr/bin/env node

import fs from 'fs';
import _ from 'lodash';

const args = process.argv.slice(2);
const filePath = args[0];

if (!filePath) {
  console.error('Error: Must provide filepath');
  process.exit(1);
}
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
interface PostmanFolder {
  name: string;
  item: PostmanRequest | PostmanFolder;
}

const verbMap = {
  GET: 1,
  POST: 2,
  PUT: 3,
  DELETE: 4,
};

function isRequest(
  item: PostmanRequest | PostmanFolder
): item is PostmanRequest {
  return (item as PostmanRequest).request !== undefined;
}

const sortItems = (obj) => {
  if (obj.item == null) {
    return obj;
  }

  const itemSorted = _.sortBy(obj.item, [
    (item: PostmanRequest | PostmanFolder) => {
      return item.name.toLowerCase();
    },
    (item: PostmanRequest | PostmanFolder) => {
      const verbSort = isRequest(item) ? verbMap[item.request.method] : 0;
      return verbSort;
    },
  ]);

  console.log(itemSorted.map((i) => i.name));

  return {
    ...obj,
    item: itemSorted.map(sortItems),
  };
};

const newJson = sortItems(json);

fs.writeFileSync(outputPath, JSON.stringify(newJson));

console.log(`Sorting Successful!\nSorted collection saved to: ${outputPath}`);
