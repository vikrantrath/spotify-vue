import { afterAll, afterEach, beforeEach, describe, expect, fn, it } from "vitest";
import { getAllPlayLists } from "../playListService";

describe('playListService', () => {
    describe('getAllPlaylists', () => {
        const ORIGINAL_ENV = process.env;
        beforeEach(() => {
            process.env = { ...ORIGINAL_ENV };
        });

        afterEach(() => {
            process.env = ORIGINAL_ENV;
        });

        it('does not call fetch on development environment', async () => {
            (fetch as any) = fn(() => Promise.resolve({ json: fn() }));
            await getAllPlayLists();
            expect(fetch).not.toHaveBeenCalled();
        })

        // not possible to override env in vitest
        it.skip('calls fetch on production environment', async () => {
            process.env = {
                ...ORIGINAL_ENV,
                NODE_ENV: 'production',
            };
            (fetch as any) = fn(() => Promise.resolve({ json: fn() }));
            const res = await getAllPlayLists();
            expect(fetch).toHaveBeenCalled();
        })
    });
})