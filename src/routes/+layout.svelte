<script>
import "../app.css";
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<svelte:head>
	<title>Morgan Williams - Full-Stack Developer</title>
	<meta name="description" content="Morgan Williams - Rapid full-stack development at scale. Explore my skills, experience, and education.">
	<meta name="keywords" content="Morgan Williams, full-stack development, data engineering, Python, Svelte, data architecture, servers">
</svelte:head>

{@render children?.()}

