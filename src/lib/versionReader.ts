import type { CVData, Experience } from "../types";

/**
 * Dynamically import all JSON files in the versions directory.
 */
const versions = import.meta.glob<CVData>("/src/lib/versions/*.json", {
	eager: true,
});

/**
 * Maps each version slug to its corresponding CV data.
 */
const versionMap: Record<string, CVData> = {};

for (const path in versions) {
	const slugMatch = path.match(/\/src\/lib\/versions\/(.*)\.json$/);
	if (slugMatch) {
		const slug = slugMatch[1];
		versionMap[slug] = {
			...versions[path].default,
			pdfLink: `/cv/${slug}/morgan-williams.pdf`,
		};
	}
}

/**
 * Retrieves a specific version by its slug.
 * @param slug - The slug identifier for the version.
 * @returns The corresponding CVData or null if not found.
 */
export function getVersion(slug: string): CVData | null {
	return versionMap[slug] || null;
}

/**
 * Combines the main version with a specified version.
 * @param slug - The slug identifier for the version to combine.
 * @returns The merged CVData or null if merging isn't possible.
 */
export function coalesceVersion(slug: string): CVData | null {
	const main = versionMap["main"];
	const version = getVersion(slug);

	if (!main || !version) {
		return null;
	}

	// Initial shallow merge: version properties override main properties.
	const merged: CVData = { ...main, ...version };

	// Merge the experience sections if they exist in both main and version.
	if (main.experience && version.experience) {
		merged.experience = mergeExperiences(main.experience, version.experience);
	}

	return merged;
}

/**
 * Merges two arrays of Experience objects by their index.
 * @param mainExperiences - The primary array of experiences.
 * @param versionExperiences - The array of experiences to merge from the version.
 * @returns A new array of merged Experience objects.
 */
function mergeExperiences(
	mainExperiences: Experience[],
	versionExperiences: Experience[]
): Experience[] {
	const maxLength = Math.max(mainExperiences.length, versionExperiences.length);
	const mergedExperiences: Experience[] = [];

	for (let i = 0; i < maxLength; i++) {
		const mainExp = mainExperiences[i];
		const versionExp = versionExperiences[i];

		if (mainExp && versionExp) {
			mergedExperiences.push({
				...mainExp,
				...versionExp,
				description: mergeDescriptions(mainExp.description, versionExp.description),
			});
		} else if (versionExp) {
			mergedExperiences.push(versionExp);
		} else if (mainExp) {
			mergedExperiences.push(mainExp);
		}
	}

	return mergedExperiences;
}

/**
 * Merges two arrays of description strings line by line.
 * Prefer version descriptions over main descriptions when available.
 * @param mainDescription - The primary array of descriptions.
 * @param versionDescription - The array of descriptions to merge from the version.
 * @returns A new array of merged description strings.
 */
function mergeDescriptions(
	mainDescription: string[],
	versionDescription: string[]
): string[] {
	const maxLength = Math.max(mainDescription.length, versionDescription.length);
	const mergedDescription: string[] = [];

	for (let i = 0; i < maxLength; i++) {
		const versionLine = versionDescription[i]?.trim();
		mergedDescription[i] = versionLine || mainDescription[i] || "";
	}

	return mergedDescription;
}

/**
 * Retrieves all available versions.
 * @returns An array of slugs representing all versions.
 */
export function getAllVersions(): string[] {
	return Object.keys(versionMap);
}
