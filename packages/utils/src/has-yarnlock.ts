/**
 * @fileoverview Checks if yarn lockfile is present and resolves conflicts if any
 */

import { access, readFile, writeFile } from 'fs';
import { join } from 'path';

export const hasYarnLock = (directory: string): Promise<boolean> => {
    return new Promise((resolve) => {
        access(join(directory, 'yarn.lock'), (err) => {
            resolve(!err);
        });
    });
};

export const resolveYarnLockConflicts = (directory: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const yarnLockPath = join(directory, 'yarn.lock');

        readFile(yarnLockPath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            const resolvedData = data.replace(/<<<<<<< HEAD[\s\S]*?=======([\s\S]*?)>>>>>>> [\s\S]*?\n/g, '$1');

            writeFile(yarnLockPath, resolvedData, 'utf8', (err) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    });
};
