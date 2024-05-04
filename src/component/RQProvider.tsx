import React, { Suspense, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Loading from './Loading';

type Props = {
	children: React.ReactNode;
};

function RQProvider({ children }: Props) {
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
			<Suspense fallback={<Loading />}>
				{children}
				<ReactQueryDevtools initialIsOpen={true} />
			</Suspense>
		</QueryClientProvider>
	);
}

export default RQProvider;
