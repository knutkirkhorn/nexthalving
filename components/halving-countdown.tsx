import React from 'react';

// TODO: rename
function TimePart({time, label}: {time: number; label: string}) {
	return (
		<div className="flex flex-col items-center">
			<span>{time}</span>
			<span className="text-sm font-medium tracking-wide sm:text-base">
				{label}
			</span>
		</div>
	);
}

const blocksBetweenHalvings = 210_000;
const averageBlockTime = 600;
const secondsInDay = 86_400;
const secondsInHour = 3600;

function calculateTimeUntilHalving(currentBlockHeight: number) {
	const blocksUntilHalving =
		blocksBetweenHalvings - (currentBlockHeight % blocksBetweenHalvings);
	const secondsUntilHalving = blocksUntilHalving * averageBlockTime;
	const days = Math.floor(secondsUntilHalving / secondsInDay);
	const hours = Math.floor(
		(secondsUntilHalving % secondsInDay) / secondsInHour,
	);
	const minutes = Math.floor((secondsUntilHalving % secondsInHour) / 60);
	const seconds = Math.floor(secondsUntilHalving % 60);

	return {days, hours, minutes, seconds};
}

export async function HalvingCountdown() {
	const blockHeightResponse = await fetch(
		'https://blockchain.info/latestblock',
		// Cache the result for 10 minutes - since Bitcoin has a new block every 10 minutes
		{next: {revalidate: averageBlockTime}},
	);
	const blockHeight = await blockHeightResponse.json();
	const timeUntilHalving = calculateTimeUntilHalving(blockHeight.height);

	return (
		<div className="grid gap-2 text-4xl font-bold sm:grid-flow-col sm:gap-4">
			<TimePart time={timeUntilHalving.days} label="days" />
			<TimePart time={timeUntilHalving.hours} label="hours" />
			<TimePart time={timeUntilHalving.minutes} label="minutes" />
			<TimePart time={timeUntilHalving.seconds} label="seconds" />
		</div>
	);
}
