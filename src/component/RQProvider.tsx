import React, { Suspense, useEffect, useState, lazy } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
	children: React.ReactNode;
};

const ReactQueryDevtoolsProduction = lazy(() =>
	import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
		default: d.ReactQueryDevtools,
	}))
);

function RQProvider({ children }: Props) {
	const [showDevtools, setShowDevtools] = useState(false);
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				// react-query 전역 설정
				queries: {
					refetchOnWindowFocus: false,
					retryOnMount: true,
					refetchOnReconnect: false,
					retry: false,
				},
			},
		})
	);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={true} />
			{showDevtools && (
				<Suspense fallback={null}>
					<ReactQueryDevtoolsProduction />
				</Suspense>
			)}
		</QueryClientProvider>
	);
}

export default RQProvider;
