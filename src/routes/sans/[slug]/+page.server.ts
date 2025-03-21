import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { coalesceVersion } from '$lib/versionReader';

export const load = (async ({ params }) => {
    const { slug } = params;
    const data = coalesceVersion(slug);

    if (!data) {
        console.error(`Error loading CV version "${slug}"`);
        error(404, 'CV version not found');
    }

	return { ...data, slug };
}) satisfies PageServerLoad;
