import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import archiveType from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('works', async t => {
	const tar = await fs.readFile(path.join(__dirname, 'fixtures/test.tar'));
	const zip = await fs.readFile(path.join(__dirname, 'fixtures/test.zip'));

	t.is(archiveType(tar).ext, 'tar');
	t.is(archiveType(tar).mime, 'application/x-tar');
	t.is(archiveType(zip).ext, 'zip');
	t.is(archiveType(zip).mime, 'application/zip');
});
