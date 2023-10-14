import type { User, FunctionCall } from "~/types";

export const usePubSub = (user: User) => {
	const { data, error, close, eventSource } = useEventSource(
		`/api/functions/${user.ref}`,
	);



	const result = computed(() => {
		if (!data.value) return;
		return JSON.parse(data.value) as FunctionCall;
	});


	onBeforeUnmount(() => {
		close();
	});

	return {
		error,
		eventSource,
		result,
	};
};
