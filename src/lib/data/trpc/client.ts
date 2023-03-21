import { createContext } from '$lib/data/trpc/context';
import { router } from '$lib/data/trpc/router';

export default function (event) {
	return router.createCaller(createContext(event));
}
