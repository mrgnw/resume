<script lang="ts">
	import Experience from "./Experience.svelte";
	import Projects from "./Projects.svelte";
	import type { CVProps } from "../types";
	import Typewriter from "svelte-typewriter";
	import { Button } from "$lib/components/ui/button";
	import { Separator } from "$lib/components/ui/separator";
	import { ChevronDown, FileText } from "lucide-svelte";
	import { browser } from "$app/environment";

	import mainData from "$lib/versions/main.json";
	let highlightedSkill = $state("");

	function highlightStack(skill: string) {
		highlightedSkill = skill;
		console.log(highlightedSkill);
	}

	import {
		Mail,
		Phone,
		Linkedin,
		Github,
		CalendarClock,
	} from "lucide-svelte";

	// Destructure props
	let {
		name = mainData.name,
		title = mainData.title,
		email = mainData.email,
		github = mainData.github,
		pdfLink = "/morgan-williams-cv",
		projects = mainData.projects,
		experience = mainData.experience,
		skills = mainData.skills,
		education = mainData.education,
		version,
	}: CVProps = $props();

	const iconSize = 30;

	const isPrinting =
		browser && new URLSearchParams(window.location.search).has("print");

	const searchParams = browser ? new URLSearchParams(window.location.search) : null;
	const removeProjects = searchParams?.get('removeProjects') 
		? parseInt(searchParams.get('removeProjects')) 
		: 0;

	if (removeProjects > 0 && projects?.length) {
		projects = projects.slice(0, Math.max(0, projects.length - removeProjects));
	}
</script>

<div class="max-w-3xl mx-auto p-8 bg-background text-foreground print:p-0 print:max-w-none print:m-0">
	<header class="flex items-start justify-between mb-8 print:mb-2 print:mt-0">
		<div>
			<h1 class="text-4xl font-bold mb-1">{name}</h1>
			<div class="text-muted-foreground">
				{#each skills as skill, index}
					<span
						class="cursor-pointer hover:text-foreground transition-colors inline-block"
						onmouseenter={() => highlightStack(skill)}
						onmouseleave={() => highlightStack("")}
						ontouchstart={() => highlightStack(skill)}
						ontouchend={() => highlightStack("")}
					>
						{skill}{#if index < skills.length - 1}<span class="mx-1">•</span
							>{/if}
					</span>
				{/each}
			</div>
		</div>
		<div class="text-right text-sm text-muted-foreground space-y-1 mt-2">
			<a
				href={`mailto:${email}`}
				class="text-muted-foreground hover:text-foreground transition-colors block"
			>
				{email}
			</a>
			<!-- <a
				href="https://morganwill.com/cal"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-foreground transition-colors block"
			>
				morganwill.com/cal
			</a> -->
			<a
				href={github}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-foreground transition-colors block"
			>
				<span class="font-semibold">github</span>.com/mrgnw
			</a>
			<a
				href="https://www.linkedin.com/in/mrgnw/"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-foreground transition-colors block"
			>
				<span class="font-semibold">linkedin</span>.com/in/mrgnw
			</a>
		</div>
	</header>

	<div class="flex items-center gap-4 mb-2 w-[81%] print:mb-1">
		<h2 class="text-2xl font-semibold shrink-0">Experience</h2>
		<Separator class="flex-grow" />
	</div>
	<Experience {experience} {highlightedSkill} />

	<!-- Projects -->
	{#if projects?.length > 0}
		<div class="flex items-center gap-4 mb-2 w-[85%] print:mb-1">
			<h2 class="text-2xl font-semibold shrink-0">Projects</h2>
			<Separator class="flex-grow" />
		</div>
		<Projects {projects} />
	{/if}

	<!-- Education -->
	<div class="flex items-center gap-4 mb-2 w-[85%] print:mb-1">
		<h2 class="text-2xl font-semibold shrink-0">Education</h2>
		<Separator class="flex-grow" />
	</div>
	<section class="education grid grid-cols-2 gap-x-8 gap-y-2 print:gap-y-1 print:gap-x-4">
		{#each education as edu}
			<div class="education-entry">
				<div class="flex justify-between items-baseline">
					<div class="flex gap-2 items-baseline">
						<h3 class="font-semibold text-base">{edu.provider}</h3>
						<p class="text-base text-muted-foreground">{edu.degree}</p>
					</div>
					<span class="text-muted-foreground text-sm whitespace-nowrap ml-2">{edu.year}</span>
				</div>
				{#if edu.summary}
					<p class="text-sm text-muted-foreground">{edu.summary}</p>
				{/if}
				{#if edu.achievements?.length}
					<div class="text-sm text-muted-foreground inline-flex gap-2">
						{#each edu.achievements as achievement, i}
							<span>{achievement}{#if i < edu.achievements.length - 1} •{/if}</span>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</section>
	

	<footer class="print-footnote mt-auto pt-4 print:hidden">
		<details>
			<summary class="flex items-center gap-1 cursor-pointer list-none">
				<span class="text-sm font-semibold">Related keywords</span>
				<ChevronDown size={16} class="transition-transform duration-200" />
			</summary>

			<p class="print-keywords text-sm text-muted-foreground py-2">
				{#each mainData.keywords as keyword, index}
					<span class="inline-block">
						{keyword}
						{#if index < mainData.keywords.length - 1}
							<span class="mx-1 text-muted-foreground/50">•</span>
						{/if}
					</span>
				{/each}
			</p>
		</details>
	</footer>
</div>

<!-- PDF Download -->
<a
	href={pdfLink}
	target="_blank"
	rel="noopener noreferrer"
	aria-label="Download Morgan's CV"
	class="no-print fixed bottom-4 right-4 bg-background p-2 rounded-full shadow-lg"
	data-sveltekit-preload-data="hover"
>
	<FileText size={iconSize} />
</a>

<style>
	:root {
		--line-height: 1.5;
		--font-size: 1.25rem;
	}

	.typewriter-wrapper {
		min-height: calc(var(--line-height) * var(--font-size) * 2);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		overflow: hidden;
	}

	.typewriter-wrapper :global(p) {
		font-size: var(--font-size);
		line-height: var(--line-height);
		margin: 0;
	}

	@media (min-width: 640px) {
		.typewriter-wrapper {
			min-height: calc(var(--line-height) * var(--font-size));
		}
	}

	@media print {
		@page {
			size: A4;
			margin: 10mm 12mm 12mm 10mm;
		}

		:global(body) {
			margin: 0 !important;
			padding: 0 !important;
			font-size: 11pt !important;
			line-height: 1.4 !important;
		}

		:global(main), :global(div) {
			margin-top: 0 !important;
		}

		:global(.text-4xl) {
			font-size: 26pt;
		}

		:global(.text-2xl) {
			font-size: 15pt;
		}

		:global(.text-xl) {
			font-size: 13pt;
		}

		:global(.text-base) {
			font-size: 11pt;
		}

		:global(.text-sm) {
			font-size: 10pt;
		}

		:global(.text-xs) {
			font-size: 9pt;
		}

		:global(.mb-8) {
			margin-bottom: 1.25rem !important;
		}

		:global(.mb-4) {
			margin-bottom: 0.875rem !important;
		}

		:global(.mb-2) {
			margin-bottom: 0.5rem !important;
		}

		:global(.gap-2) {
			gap: 0.5rem !important;
		}

		:global(.p-8) {
			padding: 1rem !important;
		}

		.print-footnote {
			position: fixed;
			bottom: 1rem;
			left: 1rem;
			right: 1rem;
			border-top: none;
		}

		.print-keywords {
			font-size: 1pt;
			color: transparent;
			user-select: none;
		}

		:global(.print-footnote [data-state="open"] > [data-accordion-content]) {
			display: block !important;
		}

		:global(.print-footnote [data-accordion-trigger]) {
			display: none !important;
		}

		.no-print {
			display: none !important;
		}

		.print-only {
			display: block !important;
		}
	}

	@media screen {
		.print-only {
			display: none;
		}
	}

	/* Remove default arrow from details summary */
	details > summary::marker,
	details > summary::-webkit-details-marker {
		display: none;
	}

	/* Rotate chevron when details is open */
	details[open] > summary > :global(svg) {
		transform: rotate(180deg);
	}
</style>
