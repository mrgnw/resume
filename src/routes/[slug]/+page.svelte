<script lang="ts">
  import CV from '$lib/CV.svelte';
  import type { PageServerLoad } from './$types';

  interface Props {
    data: PageServerLoad;
  }

  let { data }: Props = $props();
  const pdfLink = data.slug === 'main' ? 
    '/morgan-williams.pdf' : 
    `/morgan-williams.${data.slug}.pdf`;
</script>

<CV
  name={data.name}
  title={data.title}
  email={data.email}
  github={data.github}
  {pdfLink}
  skills={data.skills}
  projects={data.projects}
  experience={data.experience}
  education={data.education}
/>