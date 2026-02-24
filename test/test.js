import {Buffer} from 'node:buffer';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import archiveType from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('tar', async t => {
	const buf = await fs.readFile(path.join(__dirname, 'fixtures/test.tar'));
	const {ext, mime} = await archiveType(buf);

	t.is(ext, 'tar');
	t.is(mime, 'application/x-tar');
});

test('tar.gz', async t => {
	const buf = await fs.readFile(path.join(__dirname, 'fixtures/test.tar.gz'));
	const {ext, mime} = await archiveType(buf);

	t.is(ext, 'tar.gz');
	t.is(mime, 'application/gzip');
});

test('zip', async t => {
	const buf = await fs.readFile(path.join(__dirname, 'fixtures/test.zip'));
	const {ext, mime} = await archiveType(buf);

	t.is(ext, 'zip');
	t.is(mime, 'application/zip');
});

test('zst', async t => {
	const buf = await fs.readFile(path.join(__dirname, 'fixtures/test.zst'));
	const {ext, mime} = await archiveType(buf);

	t.is(ext, 'zst');
	t.is(mime, 'application/zstd');
});

test('invalid', async t => {
	const buf = Buffer.from('invalid');
	const type = await archiveType(buf);

	t.is(type, null);
});
