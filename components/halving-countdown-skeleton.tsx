import React from 'react';

import {Skeleton} from './ui/skeleton';

function TimePartSkeleton({label}: {label: string}) {
	return (
		<div className="flex flex-col items-center">
			<Skeleton className="w-[50px] h-[50px] rounded-md" />
			<span className="text-sm font-medium tracking-wide sm:text-base">
				{label}
			</span>
		</div>
	);
}

export async function HalvingCountdownSkeleton() {
	return (
		<div className="grid gap-2 text-4xl font-bold sm:grid-flow-col sm:gap-4">
			<TimePartSkeleton label="days" />
			<TimePartSkeleton label="hours" />
			<TimePartSkeleton label="minutes" />
			<TimePartSkeleton label="seconds" />
		</div>
	);
}
