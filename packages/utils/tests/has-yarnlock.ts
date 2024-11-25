import * as path from 'path';
import test from 'ava';

import { hasYarnLock, resolveYarnLockConflicts } from '../src/has-yarnlock';

test(`returns true if yarn.lock file is present`, async (t) => {
    const dirWithYarnLock = path.join(__dirname, 'fixtures', 'dirWithYarnLock');
    const hasLockFile = await hasYarnLock(dirWithYarnLock);

    t.is(hasLockFile, true);
});

test(`returns false if yarn.lock file is not present`, async (t) => {
    const dirWithYarnLock = path.join(__dirname, 'fixtures');
    const hasLockFile = await hasYarnLock(dirWithYarnLock);

    t.is(hasLockFile, false);
});

test(`resolves conflicts in yarn.lock file`, async (t) => {
    const dirWithYarnLock = path.join(__dirname, 'fixtures', 'dirWithYarnLock');
    await resolveYarnLockConflicts(dirWithYarnLock);

    const hasLockFile = await hasYarnLock(dirWithYarnLock);

    t.is(hasLockFile, true);
});
