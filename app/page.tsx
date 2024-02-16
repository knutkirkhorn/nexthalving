import React, {Suspense} from 'react';

import {HalvingCountdown} from '@/components/halving-countdown';
import {HalvingCountdownSkeleton} from '@/components/halving-countdown-skeleton';
import Header from '@/components/header';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center bg-background px-16 py-4  ">
			<Header />
			<p className="text-gray-500 font-semibold mt-32 mb-2">
				Time until next Bitcoin halving
			</p>
			<Suspense fallback={<HalvingCountdownSkeleton />}>
				<HalvingCountdown />
			</Suspense>
		</main>
	);
}
