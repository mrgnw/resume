<script lang="ts">
	import { LinkPreview as HoverCardPrimitive } from "bits-ui";
	import { cn, flyAndScale } from "$lib/utils.js";

	type $$Props = HoverCardPrimitive.ContentProps;

	interface Props { [key: string]: any }

	let {
		class: className = undefined,
		transition = flyAndScale,
		transitionConfig = undefined,
		align = "center",
		sideOffset = 4,
		children,
		...rest
	}: Props = $props();
	
</script>

<HoverCardPrimitive.Content
	{transition}
	{transitionConfig}
	{align}
	{sideOffset}
	class={cn(
		"bg-popover text-popover-foreground z-50 mt-3 w-64 rounded-md border p-4 shadow-md outline-none",
		className
	)}
	{...rest}
>
	{@render children?.()}
</HoverCardPrimitive.Content>
