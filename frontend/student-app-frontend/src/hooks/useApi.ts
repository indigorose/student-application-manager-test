import { useState, useEffect } from 'react';

type RequestState<T> =
	| { status: 'idle' }
	| { status: 'loading' }
	| { status: 'success'; data: T }
	| { status: 'error'; error: Error };

function useApi<T>(fetchFn: () => Promise<T>, deps: unknown[] = []) {
	const [state, setState] = useState<RequestState<T>>({
		status: 'idle',
	});
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		let isCancelled = false;

		async function load() {
			setState({ status: 'loading' });
			try {
				const data = await fetchFn();
				if (!isCancelled) {
					setState({ status: 'success', data });
				}
			} catch (error) {
				if (!isCancelled) {
					setState({
						status: 'error',
						error:
							error instanceof Error
								? error
								: new Error('Unknown error'),
					});
				}
			}
		}

		load();

		return () => {
			isCancelled = true;
		};
	}, [refresh, ...deps]);

	const refreshData = () => {
		setRefresh(!refresh);
	};

	return { state, refreshData };
}

export default useApi;
